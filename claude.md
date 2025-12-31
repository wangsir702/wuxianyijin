# 五险一金计算器 - 项目上下文管理文档

## 项目概述

这是一个迷你"五险一金"计算器 Web 应用。核心功能是根据预设的员工工资数据和城市社保标准，计算出公司为每位员工应缴纳的社保公积金费用，并将结果清晰地展示出来。

## 技术栈

| 类别 | 技术选型 |
|------|----------|
| 前端框架 | Next.js (App Router) |
| UI/样式 | Tailwind CSS |
| 数据库/后端 | Supabase |
| Excel 解析 | xlsx (SheetJS) |

## 数据库设计

### 1. cities (城市标准表)

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | int | 主键，自增 |
| city_name | text | 城市名称 |
| year | text | 年份 |
| base_min | int | 社保基数下限 |
| base_max | int | 社保基数上限 |
| rate | float | 综合缴纳比例 |

### 2. salaries (员工工资表)

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | int | 主键，自增 |
| employee_id | text | 员工工号 |
| employee_name | text | 员工姓名 |
| month | text | 年份月份（YYYYMM） |
| salary_amount | int | 该月工资金额 |

### 3. results (计算结果表)

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | int | 主键，自增 |
| employee_name | text | 员工姓名 |
| avg_salary | float | 年度月平均工资 |
| contribution_base | float | 最终缴费基数 |
| company_fee | float | 公司缴纳金额 |
