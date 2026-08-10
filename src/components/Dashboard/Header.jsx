"use client"

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const Header = ({ title, children }) => {
  const router = useRouter()

  const handleBack = (event) => {
    event.preventDefault()
    router.back()
  }

  return (
    <div className="flex flex-col gap-4 mt-5 mb-2">
      {/* Tombol Kembali (Diletakkan di Atas) */}
      <button 
        onClick={handleBack}
        className="flex self-start items-center gap-2 px-5 py-2.5 bg-color-secondary text-color-accent hover:bg-color-accent hover:text-color-secondary rounded-full transition-all group shadow-sm font-bold"
        title="Kembali"
      >
        <CaretLeft size={24} weight="bold" className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Kembali</span>
      </button>

      {/* Teks Judul di dalam kotak hijau memanjang */}
      <div className="w-full p-3 px-4 sm:px-5 flex flex-wrap sm:flex-nowrap items-center justify-between bg-color-accent text-white rounded-xl shadow-sm gap-2 sm:gap-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide leading-tight flex-1 min-w-[120px]">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Header;
