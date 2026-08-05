import prisma from "@/libs/prisma";
import React from "react";

const CommentBox = async ({ anime_mal_id }) => {
    const comments = await prisma.comment.findMany({where: { anime_mal_id }})

    if (comments.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 italic">Belum ada komentar. Jadilah yang pertama!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {comments.map(comment => {
                return (
                    <div key={comment.id} className="bg-gray-50 dark:bg-slate-800/80 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-color-accent flex items-center justify-center text-white font-bold uppercase shadow-sm">
                                {comment.username.charAt(0)}
                            </div>
                            <p className="font-bold text-gray-900 dark:text-white">{comment.username}</p>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 italic text-sm md:text-base leading-relaxed pl-11">{comment.comment}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default CommentBox