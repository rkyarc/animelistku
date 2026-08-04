import Link from "next/link"
import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
    return (
        <header className="bg-color-accent transition-colors duration-300 text-slate-900">
            <div className="flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-2.5 gap-y-2">
                <Link href="/" className="font-bold text-xl md:text-2xl text-white order-1">AnimeListKu</Link>
                <div className="w-full md:w-auto order-3 md:order-2">
                    <InputSearch />
                </div>
                <div className="flex items-center gap-4 order-2 md:order-3">
                    <ThemeToggle />
                    <UserActionButton />
                </div>
            </div>
        </header>
    )
}

export default Navbar