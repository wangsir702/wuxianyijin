# 五险一金计算器

一个基于 Next.js 和 Supabase 的五险一金计算器 Web 应用。

## 功能特点

- 📊 **数据上传** - 支持 Excel 文件上传（城市社保标准和员工工资数据）
- 🧮 **自动计算** - 根据社保基数上下限自动计算公司应缴金额
- 📈 **结果展示** - 清晰展示每位员工的平均工资、缴费基数和公司缴纳金额
- 🎨 **现代化 UI** - 使用 Tailwind CSS 打造的美观界面

## 技术栈

- **前端框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **数据库**: Supabase
- **Excel 解析**: xlsx (SheetJS)
- **语言**: TypeScript

## 快速开始

### 1. 克隆项目

\`\`\`bash
git clone https://github.com/wangsir702/wuxianyijin.git
cd wuxianyijin
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 3. 配置环境变量

创建 \`.env.local\` 文件：

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名Key
\`\`\`

### 4. 创建数据库表

在 Supabase SQL Editor 中执行：

\`\`\`sql
-- 创建 cities 表
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  city_name TEXT NOT NULL,
  year TEXT NOT NULL,
  base_min INT NOT NULL,
  base_max INT NOT NULL,
  rate FLOAT NOT NULL
);

-- 创建 salaries 表
CREATE TABLE salaries (
  id SERIAL PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  month TEXT NOT NULL,
  salary_amount INT NOT NULL
);

-- 创建 results 表
CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  employee_name TEXT NOT NULL,
  avg_salary FLOAT NOT NULL,
  contribution_base FLOAT NOT NULL,
  company_fee FLOAT NOT NULL
);

-- 开启 RLS 并允许访问
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON salaries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON results FOR ALL USING (true) WITH CHECK (true);
\`\`\`

### 5. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 使用说明

1. **上传数据** - 访问 `/upload` 页面上传 Excel 文件
2. **执行计算** - 点击"执行计算并存储结果"按钮
3. **查看结果** - 访问 `/results` 页面查看计算结果

## Excel 文件格式

### cities.xlsx（城市标准）

| city_name | year | base_min | base_max | rate |
|-----------|------|----------|----------|------|
| 佛山 | 2024 | 4000 | 25000 | 0.15 |

### salaries.xlsx（员工工资）

| employee_id | employee_name | month | salary_amount |
|-------------|---------------|-------|---------------|
| E001 | 张三 | 202401 | 8000 |

## 项目结构

\`\`\`
wuxianyijin/
├── app/                  # Next.js 页面
│   ├── page.tsx         # 主页
│   ├── upload/          # 数据上传页
│   └── results/         # 结果查询页
├── components/          # React 组件
│   ├── Card.tsx
│   ├── FileUpload.tsx
│   └── ResultsTable.tsx
├── lib/                 # 工具函数
│   ├── supabase.ts     # Supabase 客户端
│   └── calculate.ts    # 核心计算逻辑
└── public/             # 静态资源
\`\`\`

## 核心计算逻辑

1. 读取员工工资数据
2. 按员工分组计算月平均工资
3. 获取城市社保标准（基数上下限、缴纳比例）
4. 确定缴费基数：
   - 低于下限 → 使用下限
   - 高于上限 → 使用上限
   - 在范围内 → 使用平均工资
5. 计算公司缴纳金额 = 缴费基数 × 缴纳比例

## 许可证

MIT

## 作者

[@wangsir702](https://github.com/wangsir702)
