"use client"

import { FileSearch, CaretLeft } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()

    return (
        <div className="min-h-screen max-w-xl mx-auto flex justify-center items-center">
            <div className="flex justify-center items-center gap-4 flex-col text-center">
                <FileSearch size={64} className="text-color-accent mb-2" />
                <h3 className="text-color-primary text-4xl font-extrabold">HALAMAN TIDAK DITEMUKAN</h3>
                <p className="text-color-primary opacity-70 mb-4">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 px-6 py-2.5 bg-color-secondary text-color-accent hover:bg-color-accent hover:text-color-secondary transition-all rounded-full shadow-md font-bold group"
                >
                    <CaretLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali ke Halaman Sebelumnya</span>
                </button>
            </div>
        </div>
    )
}

export default Page