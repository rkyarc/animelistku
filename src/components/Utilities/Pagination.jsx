import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react/dist/ssr";

const Pagination = ({ page, lastPage, setPage }) => {
    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    const handleNextPage = () => {
        if (page < lastPage) {
            setPage((prevState) => prevState + 1)
            scrollTop()
        }
    }
    
    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevState) => prevState - 1)
            scrollTop()
        }
    }

    const handlePageClick = (num) => {
        setPage(num)
        scrollTop()
    }

    // Amankan lastPage jika undefined (karena error API/Rate Limit)
    // Jikan API seringkali error atau kosong jika dipaksa mengambil halaman yang terlalu dalam (seperti 1205).
    // Jadi kita batasi maksimal halaman ke 250 (yang sudah memuat lebih dari 6000 anime).
    const safeLastPage = Math.min(lastPage || 1, 250);

    // Logic untuk menentukan angka halaman yang tampil
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        if (endPage > safeLastPage) {
            endPage = safeLastPage;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex justify-center items-center py-8 px-2 gap-2 text-sm sm:text-base">
            {/* Prev Button */}
            <button 
                onClick={handlePrevPage} 
                disabled={page <= 1}
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 font-bold ${page <= 1 ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-600 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-color-accent hover:text-white hover:shadow-lg hover:-translate-y-1 dark:bg-slate-800 dark:text-gray-300'}`}
                aria-label="Previous Page"
            >
                <CaretLeft size={20} weight="bold" />
            </button>

            {/* First Page & Dots if needed */}
            {pageNumbers.length > 0 && pageNumbers[0] > 1 && (
                <>
                    <button 
                        onClick={() => handlePageClick(1)}
                        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 font-bold bg-white text-gray-700 hover:bg-color-accent hover:text-white shadow-sm dark:bg-slate-800 dark:text-gray-300"
                    >
                        1
                    </button>
                    {pageNumbers[0] > 2 && (
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-500">
                            <DotsThree size={24} weight="bold" />
                        </div>
                    )}
                </>
            )}

            {/* Numbered Pages */}
            {pageNumbers.map((num) => (
                <button 
                    key={num}
                    onClick={() => handlePageClick(num)}
                    className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 font-bold shadow-sm hover:-translate-y-1 ${page === num ? 'bg-color-accent text-white shadow-md scale-110' : 'bg-white text-gray-700 hover:bg-color-accent hover:text-white dark:bg-slate-800 dark:text-gray-300'}`}
                >
                    {num}
                </button>
            ))}

            {/* Last Page & Dots if needed */}
            {pageNumbers.length > 0 && pageNumbers[pageNumbers.length - 1] < safeLastPage && (
                <>
                    {pageNumbers[pageNumbers.length - 1] < safeLastPage - 1 && (
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-500">
                            <DotsThree size={24} weight="bold" />
                        </div>
                    )}
                    <button 
                        onClick={() => handlePageClick(safeLastPage)}
                        className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 font-bold bg-white text-gray-700 hover:bg-color-accent hover:text-white shadow-sm dark:bg-slate-800 dark:text-gray-300"
                    >
                        {safeLastPage}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button 
                onClick={handleNextPage} 
                disabled={page >= safeLastPage}
                className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 font-bold ${page >= safeLastPage ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-600 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-color-accent hover:text-white hover:shadow-lg hover:-translate-y-1 dark:bg-slate-800 dark:text-gray-300'}`}
                aria-label="Next Page"
            >
                <CaretRight size={20} weight="bold" />
            </button>
        </div>
    )
}

export default Pagination