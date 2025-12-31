import { supabase } from "./supabase";

interface Salary {
  employee_id: string;
  employee_name: string;
  month: string;
  salary_amount: number;
}

interface City {
  city_name: string;
  year: string;
  base_min: number;
  base_max: number;
  rate: number;
}

interface CalculationResult {
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
}

export async function calculateAndSaveResults(): Promise<{
  success: boolean;
  message: string;
  data?: CalculationResult[];
}> {
  try {
    // 1. 获取所有工资数据
    const { data: salaries, error: salaryError } = await supabase
      .from("salaries")
      .select("*");

    if (salaryError) throw new Error(`获取工资数据失败: ${salaryError.message}`);
    if (!salaries || salaries.length === 0) {
      return { success: false, message: "没有工资数据" };
    }

    // 2. 获取佛山的社保标准
    const { data: cities, error: cityError } = await supabase
      .from("cities")
      .select("*")
      .eq("city_name", "佛山")
      .limit(1);

    if (cityError) throw new Error(`获取城市数据失败: ${cityError.message}`);
    if (!cities || cities.length === 0) {
      return { success: false, message: "未找到佛山的社保标准数据" };
    }

    const cityStandard: City = cities[0];

    // 3. 按员工分组计算平均工资
    const employeeMap = new Map<string, number[]>();
    (salaries as Salary[]).forEach((s) => {
      const list = employeeMap.get(s.employee_name) || [];
      list.push(s.salary_amount);
      employeeMap.set(s.employee_name, list);
    });

    // 4. 计算每位员工的结果
    const results: CalculationResult[] = [];
    employeeMap.forEach((salaryList, employeeName) => {
      const avgSalary = salaryList.reduce((a, b) => a + b, 0) / salaryList.length;

      // 确定缴费基数
      let contributionBase = avgSalary;
      if (avgSalary < cityStandard.base_min) {
        contributionBase = cityStandard.base_min;
      } else if (avgSalary > cityStandard.base_max) {
        contributionBase = cityStandard.base_max;
      }

      // 计算公司缴纳金额
      const companyFee = contributionBase * cityStandard.rate;

      results.push({
        employee_name: employeeName,
        avg_salary: Math.round(avgSalary * 100) / 100,
        contribution_base: Math.round(contributionBase * 100) / 100,
        company_fee: Math.round(companyFee * 100) / 100,
      });
    });

    // 5. 清空旧结果并写入新结果
    const { error: deleteError } = await supabase
      .from("results")
      .delete()
      .neq("id", 0);

    if (deleteError) throw new Error(`清空旧数据失败: ${deleteError.message}`);

    const { error: insertError } = await supabase
      .from("results")
      .insert(results);

    if (insertError) throw new Error(`写入结果失败: ${insertError.message}`);

    return {
      success: true,
      message: `计算完成，共处理 ${results.length} 位员工`,
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "未知错误",
    };
  }
}
