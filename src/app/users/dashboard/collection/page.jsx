import Header from "@/components/Dashboard/Header";
import { authUserSession } from "@/libs/auth-libs";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/libs/prisma";

import DeleteCollectionButton from "@/components/AnimeList/DeleteCollectionButton";
import DeleteAllCollectionButton from "@/components/AnimeList/DeleteAllCollectionButton";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await authUserSession();
  if (!user) redirect("/");
  const collection = await prisma.collection.findMany({
    where: { user_email: user?.email },
  });

  return (
    <section className="mt-4 w-full px-4">
      <div className="mb-4">
        <Header title={"Koleksi Saya"}>
          {collection.length > 0 && (
            <DeleteAllCollectionButton user_email={user?.email} />
          )}
        </Header>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 sm:gap-6 px-4 md:px-0">
        {collection.map((collect, index) => {
          return (
            <div key={index} className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-color-accent/30 hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border border-transparent hover:border-color-accent block">
              
              <Link href={`/anime/${collect.anime_mal_id}`} className="block h-full cursor-pointer relative w-full aspect-[3/4] bg-gray-800">
                <Image
                src={collect.anime_image}
                alt={collect.anime_title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute flex flex-col justify-end w-full h-full p-4 transform translate-y-2 sm:translate-y-8 sm:group-hover:translate-y-0 transition-transform duration-300 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                <h5 className="text-base md:text-lg font-bold text-white line-clamp-2 drop-shadow-md">{collect.anime_title}</h5>
              </div>
              </Link>
              
              {/* Delete Button overlaid on top-right */}
              <div className="absolute top-2 right-2 z-20">
                <DeleteCollectionButton collectionId={collect.id} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Page;
