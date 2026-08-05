"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
  const [comment, setComment] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const router = useRouter()

  const handleInput = (event) => {
    setComment(event.target.value)
  };

  const handlePosting = async (event) => {
    event.preventDefault();

    // Validasi: Cegah komentar kosong, hanya spasi, atau kurang dari 3 karakter
    if (!comment || comment.trim().length < 3) {
      return;
    }

    const data = { anime_mal_id, user_email, comment, username, anime_title };

    const response = await fetch("/api/v1/comment", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const postComment = await response.json();
    if (postComment.isCreated) {
      setIsCreated(true);
      setComment("");
      router.refresh()
    }
    return;
  };

  return (
    <div className="flex flex-col gap-4">
      {isCreated && (
        <div className="bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg shadow-sm">
          <p className="font-medium flex items-center gap-2">✓ Komentar berhasil dikirim!</p>
        </div>
      )}

      <div className="relative">
        <textarea
          onChange={handleInput}
          value={comment}
          placeholder="Tulis pendapat Anda tentang anime ini..."
          className="w-full h-32 text-base md:text-lg p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-color-accent focus:border-transparent transition-all shadow-sm resize-y"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handlePosting}
          disabled={!comment || comment.trim().length < 3}
          className="py-2.5 px-6 bg-color-accent text-white font-semibold rounded-full shadow-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>Posting Komentar</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommentInput;