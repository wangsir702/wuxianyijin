"use client";

import { useState } from "react";
import Link from "next/link";
import FileUpload from "@/components/FileUpload";
import { supabase } from "@/lib/supabase";
import { calculateAndSaveResults } from "@/lib/calculate";

export default function UploadPage() {
  const [citiesData, setCitiesData] = useState<Record<string, unknown>[]>([]);
  const [salariesData, setSalariesData] = useState<Record<string, unknown>[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadCities = async () => {
    if (citiesData.length === 0) {
      setMessage({ type: "error", text: "请先选择城市标准文件" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("cities").insert(citiesData);
      if (error) throw error;
      setMessage({ type: "success", text: `成功上传 ${citiesData.length} 条城市数据` });
    } catch (err) {
      setMessage({ type: "error", text: `上传失败: ${err}` });
    }
    setLoading(false);
  };

  const handleUploadSalaries = async () => {
    if (salariesData.length === 0) {
      setMessage({ type: "error", text: "请先选择工资数据文件" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("salaries").insert(salariesData);
      if (error) throw error;
      setMessage({ type: "success", text: `成功上传 ${salariesData.length} 条工资数据` });
    } catch (err) {
      setMessage({ type: "error", text: `上传失败: ${err}` });
    }
    setLoading(false);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setMessage(null);
    const result = await calculateAndSaveResults();
    setMessage({ type: result.success ? "success" : "error", text: result.message });
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors mb-8">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回主页
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">数据上传</h1>
          <p className="text-gray-500">上传城市社保标准和员工工资数据</p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {message.type === "success" ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <FileUpload
              title="城市标准数据"
              description="上传包含城市社保标准的 Excel 文件"
              onDataParsed={setCitiesData}
            />
            {citiesData.length > 0 && (
              <button
                onClick={handleUploadCities}
                disabled={loading}
                className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 font-medium transition-colors"
              >
                上传到数据库 ({citiesData.length} 条)
              </button>
            )}
          </div>

          <div>
            <FileUpload
              title="员工工资数据"
              description="上传包含员工工资的 Excel 文件"
              onDataParsed={setSalariesData}
            />
            {salariesData.length > 0 && (
              <button
                onClick={handleUploadSalaries}
                disabled={loading}
                className="mt-4 w-full py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 font-medium transition-colors"
              >
                上传到数据库 ({salariesData.length} 条)
              </button>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 font-semibold text-lg transition-all shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  处理中...
                </span>
              ) : "执行计算并存储结果"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
