import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5 sm:gap-6 px-4">
      {api.data?.map((anime, index) => {
        return (
          <Link
            href={`/anime/${anime.mal_id}`}
            className="cursor-pointer group flex flex-col bg-color-secondary rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1.5 border border-transparent hover:border-color-accent"
            key={index}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-800">
              <Image
                src={anime.images.webp.image_url}
                alt={anime.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 flex flex-col flex-grow justify-center">
              <h3 className="font-bold text-sm md:text-base text-color-primary group-hover:text-color-accent transition-colors duration-300 line-clamp-2 leading-snug text-center">
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
