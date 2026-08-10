import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import Hero from "@/components/Hero";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/libs/api-libs";

const Page = async () => {
  // Fetch top anime
  const topAnime = await getAnimeResponse("top/anime", "limit=10")
  
  // Fetch seasonal anime (tanpa limit agar bisa dipakai ulang)
  const seasonalAnime = await getAnimeResponse("seasons/now")
  
  // Ambil 5 teratas untuk Hero
  const trendingAnime = { data: seasonalAnime?.data?.slice(0, 5) || [] }

  // Fetch rekomendasi
  let recommendedAnimeRaw = await getNestedAnimeResponse("recommendations/anime", "entry")
  
  let recommendedAnime;
  if (recommendedAnimeRaw && recommendedAnimeRaw.length > 0) {
      recommendedAnime = reproduce(recommendedAnimeRaw, 10)
  } else {
      // Fallback ke seasonalAnime jika API rekomendasi Jikan sedang limit/down
      // Kita gunakan data seasonalAnime yang sudah difetch di atas, jadi tidak perlu panggil API ke-4 kalinya!
      recommendedAnime = reproduce(seasonalAnime?.data, 10);
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