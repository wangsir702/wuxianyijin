"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ResultsTable from "@/components/ResultsTable";
import { supabase } from "@/lib/supabase";

interface Result {
  id: number;
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
}

export default function ResultsPage() {
  const [data, setData] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      const { data: results, error } = await supabase
        .from("results")
        .select("*");

      if (error) {
        setError(error.message);
      } else {
        setData(results || []);
      }
      setLoading(false);
    }

    fetchResults();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors mb-8">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回主页
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">计算结果</h1>
          <p className="text-gray-500">查看所有员工的社保公积金缴纳明细</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="ml-3 text-gray-500">加载中...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            加载失败: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {data.length > 0 && (
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">共 {data.length} 条记录</span>
              </div>
            )}
            <ResultsTable data={data} />
          </div>
        )}
      </div>
    </main>
  );
}
