import Header from "@/components/Dashboard/Header";
import { authUserSession } from "@/libs/auth-libs";
import prisma from "@/libs/prisma";
import Link from "next/link";
import React from "react";
import DeleteCommentButton from "@/components/AnimeList/DeleteCommentButton";
import DeleteAllCommentButton from "@/components/AnimeList/DeleteAllCommentButton";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await authUserSession();
  if (!user) redirect("/");

  const comments = await prisma.comment.findMany({
    where: { user_email: user?.email },
  });

  return (
    <section className="mt-4 w-full px-4">
      <div className="mb-4">
        <Header title={"Komentar Saya"}>
          {comments.length > 0 && (
            <DeleteAllCommentButton user_email={user?.email} />
          )}
        </Header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="relative block group h-full">
              {/* Tombol hapus satuan diletakkan di sudut kanan atas card */}
              <DeleteCommentButton commentId={comment.id} />

              <Link
                href={`/anime/${comment.anime_mal_id}`}
                className="bg-white dark:bg-slate-800 text-color-dark dark:text-color-primary p-5 pr-12 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-700 flex flex-col justify-between h-full"
              >
                <div>
                  <p className="text-sm md:text-base font-bold text-color-accent mb-2">{comment.anime_title}</p>
                  <p className="italic text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-4">{comment.comment}</p>
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