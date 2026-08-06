import { getAnimeResponse } from "@/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const Page = async ({params}) => {
  const {keyword} = await params

  const decodeKeyword = decodeURI(keyword)
  const searchAnime = await getAnimeResponse("anime", `q=${decodeKeyword}`)

  return (
    <>
      <section className="px-4 md:px-0">
        <Header title={`Pencarian untuk ${decodeKeyword}...`} />
        {searchAnime?.data?.length > 0 ? (
          <AnimeList api={searchAnime} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-color-primary text-lg md:text-xl font-bold text-center">
              Maaf, data tidak ditemukan atau API sedang gangguan.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
