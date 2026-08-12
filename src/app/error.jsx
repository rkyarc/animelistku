"use client"

import { WarningCircle } from "@phosphor-icons/react"

export default function Error({ error, reset }) {
  return (
    <div className="flex justify-center items-center flex-col min-h-[50vh] gap-4">
        <WarningCircle size={64} className="text-color-accent" />
        <h2 className="text-2xl font-bold">Terjadi Kesalahan!</h2>
        <p className="text-color-primary">Gagal memuat data dari server atau API Jikan sedang sibuk.</p>
        <button 
            onClick={() => reset()} 
            className="bg-color-accent text-color-primary px-4 py-2 rounded-md hover:brightness-110 transition-all"
        >
            Coba Lagi
        </button>
    </div>
  )
}
