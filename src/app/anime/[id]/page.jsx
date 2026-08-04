import { getAnimeResponse } from "@/libs/api-libs";
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
    <>
      <div className="pt-4 px-4">
        <h3 className="text-color-primary text-2xl">
          {anime.data?.title} - {anime.data?.year}
        </h3>
        {!collection && user && (
          <CollectionButton
            anime_mal_id={id}
            user_email={user?.email}
            anime_image={anime.data.images.webp.image_url}
            anime_title={anime.data.title}
          />
        )}
      </div>
      <div className="pt-4 px-4 flex gap-2 text-color-primary overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>PERINGKAT</h3>
          <p>{anime.data.rank}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>SKOR</h3>
          <p>{anime.data.score}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>ANGGOTA</h3>
          <p>{anime.data.members}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border border-color-primary p-2">
          <h3>EPISODE</h3>
          <p>{anime.data.episodes}</p>
        </div>
      </div>
      <div className="pt-4 px-4 flex sm:flex-nowrap flex-wrap gap-2 text-color-primary">
        <div className="relative w-full sm:w-[250px] h-[350px] shrink-0">
          <Image
            src={anime.data.images.webp.image_url}
            alt={anime.data.title || "Anime Cover"}
            fill
            sizes="(max-width: 640px) 100vw, 250px" 
            className="rounded object-cover"
            priority
          />
        </div>
        <p className="text-justify text-xl">{anime.data.synopsis}</p>
      </div>
      <div className="p-4">
        <h3 className="text-color-primary text-2xl mb-2">Komentar</h3>
        <CommentBox anime_mal_id={id} />

        {user && (
          <CommentInput
            anime_mal_id={id}
            user_email={user?.email}
            username={user?.name}
            anime_title={anime.data.title}
          />
        )}
      </div>
      <div>
        <VideoPlayer youtubeId={anime.data.trailer.youtube_id} />
      </div>
    </>
  );
};

export default Page;
