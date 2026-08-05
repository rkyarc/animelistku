import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=10")
  let recommendedAnimeRaw = await getNestedAnimeResponse("recommendations/anime", "entry")
  
  let recommendedAnime;
  if (recommendedAnimeRaw && recommendedAnimeRaw.length > 0) {
      recommendedAnime = reproduce(recommendedAnimeRaw, 10)
  } else {
      // Fallback ke anime musim ini jika API rekomendasi Jikan sedang down (504 Error)
      recommendedAnime = await getAnimeResponse("seasons/now", "limit=10");
  }

  return (
    <>
      <section>
      <Header title="Paling Populer" linkHref="/populer" linkTitle="Lihat Semua" />
      <AnimeList api={topAnime}/>
      </section>
      <section>
      <Header title="Rekomendasi" />
      <AnimeList api={recommendedAnime}/>
      </section>
    </>
  );
};

export default Page;