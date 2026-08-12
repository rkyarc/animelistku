import Image from "next/image";
import Link from "next/link";
import { Star } from "@phosphor-icons/react/dist/ssr";

const AnimeList = ({ api }) => {
  if (!api || !api.data || api.data.length === 0) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-color-primary text-lg">Data anime tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6 px-4 md:px-0">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-color-accent/30 hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border border-transparent hover:border-color-accent ${index >= 10 ? 'hidden sm:block' : 'block'}`}
            key={index}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-800">
              <Image
                src={anime.images.webp.large_image_url || anime.images.webp.image_url}
                alt={anime.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-in-out"
                priority={index < 4}
              />
              
              {/* Overlay Gradient on Hover (Tetap gelap di semua tema) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Score Badge (Selalu Tampil) */}
              {anime.score && (
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-white font-bold px-2 py-1 rounded-md text-xs flex items-center gap-1 z-20 shadow-sm border border-white/10">
                      <Star weight="fill" className="text-yellow-400" size={14} />
                      {anime.score}
                  </div>
              )}

              {/* Hover Text Information */}
              <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex flex-col justify-end h-full">
                  <div className="mb-2">
                     <span className="bg-color-accent/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md shadow-sm border border-color-accent/50 inline-block">
                         {anime.status || (anime.year ? anime.year : 'Anime')}
                     </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 leading-tight drop-shadow-md mb-1">
                    {anime.title}
                  </h3>
                  <p className="text-gray-100 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 drop-shadow-lg font-medium leading-relaxed">
                      {anime.synopsis || "Sinopsis tidak tersedia."}
                  </p>
              </div>
            </div>
            
            {/* Title Container (Tampil saat TIDAK di-hover) */}
            <div className="absolute bottom-0 w-full p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300 z-10">
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-white line-clamp-2 leading-tight drop-shadow-md">
                {anime.title}
              </h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
