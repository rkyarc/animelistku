"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    return (
        <div className="fixed inset-0 bg-color-dark flex flex-col justify-center items-center z-50">
            {/* Inject CSS to hide Navbar and Footer that come from layout.jsx */}
            <style>{`
                header, footer { display: none !important; }
                body { overflow: hidden; }
            `}</style>
            
            <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-red-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor" className="text-red-500">
                        <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
                    </svg>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sign Out</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Apakah Anda yakin ingin keluar dari akun Anda?</p>
                
                <div className="flex w-full gap-3">
                    <button 
                        onClick={() => router.back()}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-white rounded-xl font-semibold transition-colors"
                    >
                        Batal
                    </button>
                    <button 
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Ya, Keluar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page;
