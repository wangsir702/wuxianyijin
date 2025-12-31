import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: "upload" | "chart";
}

export default function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          {icon === "upload" ? (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
        <div className="mt-5 flex items-center text-blue-500 text-sm font-medium group-hover:text-blue-600">
          进入
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
