import { getAnimeResponse, translateText } from "@/libs/api-libs";
import VideoPlayer from "@/components/Utilities/VideoPlayer";
import Image from "next/image";
import CollectionButton from "@/components/AnimeList/CollectionButton";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import CommentInput from "@/components/AnimeList/CommentInput";
import CommentBox from "@/components/AnimeList/CommentBox";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const anime = await getAnimeResponse(`anime/${id}`);
  
  if (!anime || !anime.data) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h3 className="text-color-primary text-2xl font-bold">Anime tidak ditemukan atau server sedang sibuk (Rate Limit). Silakan refresh atau coba lagi nanti.</h3>
      </div>
    );
  }
  const user = await authUserSession();
  const collection = user ? await prisma.collection.findFirst({
    where: { user_email: user.email, anime_mal_id: id },
  }) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-color-dark transition-colors duration-300">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] md:h-[450px]">
        {/* Blurred Background */}
        <div className="absolute inset-0">
          <Image
            src={anime.data.images.webp.large_image_url || anime.data.images.webp.image_url}
            alt="background"
            fill
            className="object-cover blur-sm opacity-50 dark:opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/60 to-transparent dark:from-color-dark dark:via-color-dark/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex flex-col md:flex-row items-end pb-8 gap-6 md:gap-8">
          <div className="w-40 h-56 md:w-56 md:h-80 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-color-dark relative">
            <Image
              src={anime.data.images.webp.image_url}
              alt={anime.data.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 224px"
              priority
            />
          </div>
          <div className="flex flex-col gap-2 md:gap-4 mb-2 md:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-lg">
              {anime.data?.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-lg font-semibold tracking-wide">
              {anime.data?.year || "Tahun tidak diketahui"} • {anime.data?.type || "TV"} • {anime.data?.status}
            </p>
            {!collection && user && (
              <div className="mt-2">
                <CollectionButton
                  anime_mal_id={id}
                  user_email={user?.email}
                  anime_image={anime.data.images.webp.image_url}
                  anime_title={anime.data.title}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm hover:border-color-accent dark:hover:border-color-accent transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Peringkat</h3>
            <p className="text-color-primary text-2xl font-bold">#{anime.data.rank || "-"}</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm hover:border-color-accent dark:hover:border-color-accent transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Skor</h3>
            <p className="text-color-primary text-2xl font-bold flex items-center gap-1">
              ⭐ {anime.data.score || "N/A"}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm hover:border-color-accent dark:hover:border-color-accent transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Anggota</h3>
            <p className="text-color-primary text-2xl font-bold">{anime.data.members?.toLocaleString()}</p>
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm hover:border-color-accent dark:hover:border-color-accent transition-colors">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Episode</h3>
            <p className="text-color-primary text-2xl font-bold">{anime.data.episodes || "-"}</p>
          </div>
        </div>

        {/* Synopsis */}
        <div className="bg-white dark:bg-slate-800/30 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-slate-700 pb-2 inline-block">Sinopsis</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-lg leading-relaxed text-justify">
            {anime.data.synopsis ? await translateText(anime.data.synopsis) : "Sinopsis belum tersedia."}
          </p>
        </div>

        {/* Comments Section */}
        <div className="bg-white dark:bg-slate-800/30 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-slate-700 pb-2 inline-block">Komentar Penonton</h2>
          <CommentBox anime_mal_id={id} />
          {user ? (
            <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
              <CommentInput
                anime_mal_id={id}
                user_email={user?.email}
                username={user?.name}
                anime_title={anime.data.title}
              />
            </div>
          ) : (
            <div className="mt-6 bg-gray-100 dark:bg-slate-800 p-4 rounded-xl text-center">
              <p className="text-gray-500 dark:text-gray-400">Silakan <a href="/login" className="text-color-accent hover:underline font-bold">Sign In</a> untuk memberikan komentar.</p>
            </div>
          )}
        </div>
      </div>

      {/* Trailer Video Player */}
      <div>
        <VideoPlayer youtubeId={anime.data.trailer?.youtube_id} />
      </div>
    </div>
  );
};

export default Page;
