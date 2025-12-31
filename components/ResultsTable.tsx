"use client";

interface Result {
  id?: number;
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
}

interface ResultsTableProps {
  data: Result[];
}

export default function ResultsTable({ data }: ResultsTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500">暂无数据</p>
        <p className="text-gray-400 text-sm mt-1">请先上传数据并执行计算</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              员工姓名
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              平均工资
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              缴费基数
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              公司缴纳
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr key={row.id || index} className="hover:bg-blue-50/50 transition-colors">
              <td className="px-6 py-4">
                <span className="font-medium text-gray-800">{row.employee_name}</span>
              </td>
              <td className="px-6 py-4 text-right text-gray-600">
                ¥{row.avg_salary.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 text-right text-gray-600">
                ¥{row.contribution_base.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-semibold text-blue-600">
                  ¥{row.company_fee.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
