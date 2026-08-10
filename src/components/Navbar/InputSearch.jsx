"use client"

import { MagnifyingGlass, CircleNotch } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

const InputSearch = () => {
    const router = useRouter()
    const [keyword, setKeyword] = useState("")
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const dropdownRef = useRef(null)

    // Handle klik di luar untuk menutup dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Debounce Search
    useEffect(() => {
        const searchTimer = setTimeout(async () => {
            if (keyword.trim().length >= 3) {
                setIsSearching(true)
                setShowDropdown(true)
                setErrorMsg(null)
                try {
                    // Menggunakan fallback URL jika env variabel belum terload di client side
                    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.jikan.moe/v4"
                    const response = await fetch(`${baseUrl}/anime?q=${encodeURIComponent(keyword)}&limit=5`)
                    
                    if (!response.ok) {
                        if (response.status === 504) {
                            setErrorMsg("Server API sedang sibuk (504). Coba lagi nanti.")
                        } else if (response.status === 429) {
                            setErrorMsg("Terlalu banyak permintaan (429). Tunggu sebentar.")
                        } else {
                            setErrorMsg(`Gagal mengambil data (Status: ${response.status})`)
                        }
                        setResults([])
                        return // Keluar dari fungsi tanpa lanjut parse JSON
                    }
                    
                    const data = await response.json()
                    setResults(data.data || [])
                } catch (error) {
                    console.error("Pencarian error:", error)
                    setErrorMsg("Terjadi kesalahan jaringan.")
                    setResults([])
                } finally {
                    setIsSearching(false)
                }
            } else {
                setResults([])
                setErrorMsg(null)
                setShowDropdown(false)
            }
        }, 500) // delay 500ms

        return () => clearTimeout(searchTimer)
    }, [keyword])

    const handleSearch = (event) => {
        if(!keyword || keyword.trim() === "") return
        if(event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            setShowDropdown(false)
            router.push(`/search/${keyword}`)
        }
    }

    return (
        <div className="relative w-full sm:w-auto mt-2 md:mt-0 text-slate-900" ref={dropdownRef}>
            <input 
                placeholder="Cari anime favorit..." 
                className="w-full sm:w-64 px-4 py-2 pr-12 text-sm text-slate-900 bg-white rounded-full shadow-sm outline-none border border-transparent transition-all duration-300 ease-in-out focus:sm:w-80 focus:border-color-accent focus:shadow-md"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => { if(keyword.trim().length >= 3) setShowDropdown(true) }}
            />
            <button 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-color-accent transition-all duration-200 hover:scale-110 active:scale-95" 
                onClick={handleSearch}
                aria-label="Search"
            >
                <MagnifyingGlass size={22} weight="bold" />
            </button>

            {/* Dropdown Autocomplete */}
            {showDropdown && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-color-primary rounded-2xl shadow-xl overflow-hidden z-50 border border-gray-100 dark:border-gray-800 transition-all duration-300">
                    {isSearching ? (
                        <div className="flex justify-center items-center p-6">
                            <CircleNotch size={28} className="animate-spin text-color-accent" />
                        </div>
                    ) : errorMsg ? (
                        <div className="p-6 text-center text-sm text-red-500 font-medium">
                            {errorMsg}
                        </div>
                    ) : results.length > 0 ? (
                        <ul>
                            {results.map((anime) => (
                                <li key={anime.mal_id} className="border-b last:border-0 border-gray-100 dark:border-gray-700/50">
                                    <Link 
                                        href={`/anime/${anime.mal_id}`}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-color-secondary transition-colors"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <Image 
                                            src={anime.images.webp.image_url} 
                                            alt={anime.title}
                                            width={40}
                                            height={56}
                                            className="rounded-md object-cover w-10 h-14 shadow-sm"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-color-primary dark:text-white truncate">{anime.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                                {anime.status} • ⭐ {anime.score || "N/A"}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button 
                                    onClick={(e) => handleSearch(e)}
                                    className="w-full text-center p-3 text-xs font-bold text-color-accent hover:bg-gray-50 dark:hover:bg-color-secondary transition-colors"
                                >
                                    Lihat semua hasil untuk "{keyword}"
                                </button>
                            </li>
                        </ul>
                    ) : keyword.trim().length >= 3 ? (
                        <div className="p-6 text-center text-sm text-gray-500 font-medium">
                            Oops! Anime "{keyword}" tidak ditemukan.
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default InputSearch