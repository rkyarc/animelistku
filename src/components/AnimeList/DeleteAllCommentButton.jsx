"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const DeleteAllCommentButton = ({ user_email }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteAll = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch("/api/v1/Comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true, user_email }),
      });

      const data = await response.json();
      if (data.isDeleted) {
        router.refresh();
      } else {
        setIsDeleting(false);
        setShowConfirm(false);
      }
    } catch (error) {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const Modal = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl transform transition-all">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hapus Semua Komentar?</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Peringatan: Seluruh anime di dalam daftar Komentar Anda akan dihapus permanen.</p>

          <div className="flex w-full gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-full font-semibold transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteAll}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {isDeleting ? "Menghapus..." : "Ya, Hapus Semua"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300 bg-white text-red-500 hover:bg-red-500 hover:text-white shadow-sm text-sm md:text-base border border-transparent hover:border-white group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-bounce" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="hidden sm:inline">Hapus Semua Komentar</span>
        <span className="sm:hidden">Hapus Semua</span>
      </button>

      {/* Modal Popup via Portal */}
      {mounted && showConfirm && createPortal(<Modal />, document.body)}
    </>
  );
};

export default DeleteAllCommentButton;
