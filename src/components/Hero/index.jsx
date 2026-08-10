"use client";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Info, Star } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

const Hero = ({ api }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide every 5 seconds, pauses on hover
  useEffect(() => {
    if (!api?.data || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(api.data.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

  if (!api?.data || api.data.length === 0) return null;

  // Hanya ambil maksimal 5 teratas
  const animeList = api.data.slice(0, 5);
  const anime = animeList[currentIndex];

  return (
    <div 
      className="relative w-full h-[50vh] md:h-[65vh] rounded-2xl overflow-hidden mb-8 shadow-2xl group cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
         <Image
           src={anime.images.webp.large_image_url}
           alt={anime.title}
           fill
           className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
           priority
         />
         {/* Overlay Gradient: Lebih halus dan tebal di area teks untuk readability */}
         <div className="absolute inset-0 bg-gradient-to-t from-color-primary via-color-primary/80 to-transparent dark:from-color-dark dark:via-color-dark/80"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-color-primary/90 via-color-primary/50 to-transparent dark:from-color-dark/90 dark:via-color-dark/50 w-full md:w-3/4"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4 lg:w-2/3 flex flex-col gap-3 md:gap-4">
        {/* Badges */}
        <div className="flex gap-3 items-center flex-wrap mb-1">
           <span className="bg-color-accent/90 backdrop-blur-sm text-white px-3 py-1 text-xs md:text-sm font-bold rounded-md shadow-sm border border-color-accent">
             TREN MUSIM INI
           </span>
           {anime.score && (
              <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 text-xs md:text-sm font-bold rounded-md flex items-center gap-1.5 border border-white/10 shadow-sm">
                <Star weight="fill" className="text-yellow-400" size={16} />
                {anime.score}
              </span>
           )}
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white line-clamp-2 leading-tight drop-shadow-xl tracking-tight">
          {anime.title}
        </h1>
        
        <p className="text-gray-200 text-sm md:text-base line-clamp-3 md:line-clamp-4 drop-shadow-md font-medium leading-relaxed max-w-2xl">
          {anime.synopsis}
        </p>

        <div className="flex gap-3 md:gap-4 mt-4">
          <Link href={`/anime/${anime.mal_id}`} className="bg-color-accent hover:bg-color-accent/80 transition-colors text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold flex items-center gap-2.5 shadow-lg hover:shadow-color-accent/50 active:scale-95 duration-200">
            <Info size={24} weight="bold" />
            <span>Detail Info</span>
          </Link>
          {anime.trailer?.url && (
            <a href={anime.trailer.url} target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 transition-colors text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold flex items-center gap-2.5 shadow-lg active:scale-95 duration-200">
              <PlayCircle size={24} weight="fill" />
              <span>Trailer</span>
            </a>
          )}
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2.5 z-10">
         {animeList.map((_, idx) => (
           <button 
             key={idx}
             onClick={() => setCurrentIndex(idx)}
             className={`h-2.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? "w-8 bg-color-accent" : "w-2.5 bg-white/40 hover:bg-white/80"}`}
             aria-label={`Pindah ke slide ${idx + 1}`}
           />
         ))}
      </div>
    </div>
  );
};

export default Hero;
