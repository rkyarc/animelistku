"use client"

import { MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()

    const handleSearch = (event) => {
        const keyword = searchRef.current.value

        if(!keyword || keyword.trim() == "") return

        if(event.key === "Enter" || event.type === "click") {
            event.preventDefault()
            router.push(`/search/${keyword}`)
        }
    }

    return (
        <div className="relative w-full sm:w-auto mt-2 md:mt-0 text-slate-900">
            <input 
                placeholder="Cari anime favorit..." 
                className="w-full sm:w-64 px-4 py-2 pr-12 text-sm text-slate-900 bg-white rounded-full shadow-sm outline-none border border-transparent transition-all duration-300 ease-in-out focus:sm:w-80 focus:border-slate-900 focus:shadow-md"
                ref={searchRef}
                onKeyDown={handleSearch}
            />
            <button 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-slate-900 transition-all duration-200 hover:scale-110 active:scale-95" 
                onClick={handleSearch}
                aria-label="Search"
            >
                <MagnifyingGlass size={22} />
            </button>
        </div>
    )
}

export default InputSearch