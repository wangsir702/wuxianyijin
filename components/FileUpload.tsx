"use client";

import { useRef, useState } from "react";
import * as XLSX from "xlsx";

interface FileUploadProps {
  title: string;
  description: string;
  onDataParsed: (data: Record<string, unknown>[]) => void;
}

export default function FileUpload({
  title,
  description,
  onDataParsed,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDragging, setIsDragging] = useState(false);

  const parseFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onDataParsed(jsonData as Record<string, unknown>[]);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) parseFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) parseFile(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>

      <div
        className={`p-6 transition-colors ${isDragging ? "bg-blue-50" : "bg-gray-50"}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200"}`}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx,.xls" className="hidden" />

          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <p className="text-gray-600 mb-2">拖拽文件到此处，或</p>
          <button onClick={() => fileInputRef.current?.click()} className="text-blue-500 font-medium hover:text-blue-600">
            点击选择文件
          </button>
          <p className="text-gray-400 text-xs mt-2">支持 .xlsx, .xls 格式</p>
        </div>

        {fileName && (
          <div className={`mt-4 p-3 rounded-lg flex items-center ${status === "success" ? "bg-green-50" : status === "error" ? "bg-red-50" : "bg-gray-100"}`}>
            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-gray-700 text-sm flex-1">{fileName}</span>
            {status === "success" && <span className="text-green-600 text-sm font-medium">解析成功</span>}
            {status === "error" && <span className="text-red-600 text-sm font-medium">解析失败</span>}
          </div>
        )}
      </div>
    </div>
  );
}
