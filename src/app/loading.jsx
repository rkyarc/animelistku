const Loading = () => {
    return (
      <div className="w-full">
        <section className="mt-8 px-4">
          {/* Skeleton Header */}
          <div className="h-14 w-full bg-gray-300 dark:bg-gray-700/50 rounded-lg animate-pulse mb-6"></div>
          
          {/* Skeleton Cards */}
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div 
                key={index} 
                className={`flex-col bg-gray-200 dark:bg-slate-800/60 rounded-xl overflow-hidden shadow-sm animate-pulse ${index >= 9 ? 'hidden sm:flex' : 'flex'}`}
              >
                {/* Poster Placeholder */}
                <div className="w-full aspect-[3/4] bg-gray-300 dark:bg-slate-700/60"></div>
                
                {/* Title Placeholder */}
                <div className="p-4 flex flex-col gap-2 justify-center items-center h-20">
                  <div className="h-3 bg-gray-400 dark:bg-slate-600 rounded-full w-full"></div>
                  <div className="h-3 bg-gray-400 dark:bg-slate-600 rounded-full w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
};

export default Loading