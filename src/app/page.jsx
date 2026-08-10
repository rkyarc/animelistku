import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Hero from "@/components/Hero";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";

const Page = async () => {
  const topAnime = await getAnimeResponse("top/anime", "limit=10")
  const trendingAnime = await getAnimeResponse("seasons/now", "limit=5")
  let recommendedAnimeRaw = await getNestedAnimeResponse("recommendations/anime", "entry")
  
  let recommendedAnime;
  if (recommendedAnimeRaw && recommendedAnimeRaw.length > 0) {
      recommendedAnime = reproduce(recommendedAnimeRaw, 10)
  } else {
      // Fallback ke anime musim ini jika API rekomendasi Jikan sedang down (504 Error)
      const fallbackAnime = await getAnimeResponse("seasons/now");
      recommendedAnime = reproduce(fallbackAnime?.data, 10);
  }

  return (
    <>
      <Hero api={trendingAnime} />
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