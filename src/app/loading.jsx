const Loading = () => {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-color-dark transition-colors duration-300">
        <section className="max-w-5xl mx-auto px-4 py-8">
          {/* Skeleton Header */}
          <div className="h-10 w-48 md:w-64 bg-gray-300 dark:bg-slate-700/60 rounded-xl animate-pulse mb-6"></div>
          
          {/* Skeleton Cards Grid (Matches AnimeList layout) */}
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <div 
                key={index} 
                className={`relative rounded-xl overflow-hidden shadow-sm animate-pulse block`}
              >
                {/* Poster Placeholder (3/4 aspect ratio) */}
                <div className="w-full aspect-[3/4] bg-gray-300 dark:bg-slate-800/80"></div>
                
                {/* Score Badge Skeleton */}
                <div className="absolute top-2 right-2 w-12 h-6 bg-gray-400 dark:bg-slate-600 rounded-md"></div>
                
                {/* Title Container Skeleton (Bottom Overlay) */}
                <div className="absolute bottom-0 w-full p-3 sm:p-4 bg-gradient-to-t from-gray-400 via-gray-300/80 dark:from-black dark:via-black/80 to-transparent">
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-slate-600 rounded-full w-full mb-2"></div>
                  <div className="h-3 sm:h-4 bg-gray-200 dark:bg-slate-600 rounded-full w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
};

export default Loading