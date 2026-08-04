const Footer = () => {
    return (
        <footer className="bg-color-accent text-white py-10 mt-12 shadow-inner">
            <div className="max-w-5xl mx-auto px-4 md:px-0 flex flex-col justify-center items-center gap-2">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-wide">AnimeListKu</h2>
                    <p className="text-sm mt-2 text-gray-100">Platform Katalog & Review Anime Terlengkap</p>
                </div>
            </div>
            
            <div className="max-w-5xl mx-auto px-4 md:px-0 mt-8 pt-6 border-t border-white/20 text-center text-xs text-gray-200">
                &copy; {new Date().getFullYear()} AnimeListKu. Hak Cipta Dilindungi.
            </div>
        </footer>
    )
}

export default Footer
