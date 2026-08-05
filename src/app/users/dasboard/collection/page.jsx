import Header from "@/components/Dasboard/Header";
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
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        {collection.map((collect, index) => {
          return (
            <div key={index} className="relative block group overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.02]">
              {/* Delete Button overlaid on top-right */}
              <DeleteCollectionButton collectionId={collect.id} />
              
              <Link href={`/anime/${collect.anime_mal_id}`} className="block h-full cursor-pointer">
                <Image
                src={collect.anime_image}
                alt={collect.anime_image}
                width={350}
                height={350}
                className="w-full h-full object-cover aspect-[3/4]"
              />
              <div className="absolute flex items-center justify-center bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-4 px-2">
                <h5 className="text-base md:text-lg font-bold text-white text-center line-clamp-2">{collect.anime_title}</h5>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Page;
