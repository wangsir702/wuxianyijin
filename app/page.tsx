import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            五险一金计算器
          </h1>
          <p className="text-gray-500 text-lg">
            快速计算公司应缴纳的社保公积金费用
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="数据上传"
            description="上传城市社保标准和员工工资数据，一键执行计算"
            href="/upload"
            icon="upload"
          />
          <Card
            title="结果查询"
            description="查看所有员工的社保公积金缴纳明细"
            href="/results"
            icon="chart"
          />
        </div>
      </div>
    </main>
  );
}
