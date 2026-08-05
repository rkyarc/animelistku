"use client";

import React, { useState } from "react";
import { BookmarkSimple, CheckCircle } from "@phosphor-icons/react/dist/ssr";

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title }) => {
    const [isCreated, setIsCreated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const handleCollection = async (event) => {
    event.preventDefault();
    if (isLoading || isCreated) return;
    
    setIsLoading(true);

    const data = { anime_mal_id, user_email, anime_image, anime_title };

    try {
        const response = await fetch("/api/v1/collection", {
            method: "POST",
            body: JSON.stringify(data)
        });
        const collection = await response.json();
        if (collection.isCreated) {
            setIsCreated(true);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
        {
        isCreated 
        ? 
        <div className="inline-flex w-fit items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-full font-bold shadow-md cursor-default transition-all">
            <CheckCircle size={22} weight="bold" />
            <span>Tersimpan di Koleksi</span>
        </div>
        :
        <button 
            onClick={handleCollection} 
            disabled={isLoading}
            className="inline-flex w-fit items-center gap-2 px-6 py-2.5 bg-color-accent hover:brightness-90 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 group"
        >
            <BookmarkSimple size={22} weight="bold" className="group-hover:-translate-y-0.5 transition-transform" />
            <span>{isLoading ? "Menyimpan..." : "Tambah ke Koleksi"}</span>
        </button>
        }
    </>
  );
};

export default CollectionButton;
