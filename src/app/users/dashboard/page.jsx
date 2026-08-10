import { authUserSession } from "@/libs/auth-libs";
import Image from "next/image";
import Link from "next/link";
import { FolderNotchOpen, ChatTeardropText } from "@phosphor-icons/react/dist/ssr";

import { redirect } from "next/navigation";

const Page = async () => {
  const user = await authUserSession();
  if (!user) redirect("/");

  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      {/* Profile Card */}
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden relative">
        {/* Banner */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-color-accent to-teal-400 w-full relative">
        </div>
        
        {/* Profile Content */}
        <div className="flex flex-col items-center px-6 pb-8 relative -mt-16 md:-mt-24">
          {/* Avatar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-color-accent to-teal-300 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Image 
              src={user?.image || null} 
              alt="Profile Picture" 
              width={150} 
              height={150} 
              className="relative w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover bg-white" 
            />
          </div>
          
          <h5 className="text-2xl md:text-3xl font-bold mt-4 text-gray-900 dark:text-white text-center">
            Selamat datang, <span className="text-color-accent">{user?.name}</span>!
          </h5>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-center">{user?.email}</p>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mt-10">
            <Link
              href="/users/dashboard/collection"
              className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-50 hover:bg-color-accent dark:bg-slate-700/50 dark:hover:bg-color-accent text-gray-700 hover:text-white dark:text-gray-200 dark:hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 text-color-accent rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <FolderNotchOpen size={32} weight="duotone" className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <span className="font-bold text-sm md:text-lg text-center">Koleksi Saya</span>
            </Link>
            
            <Link
              href="/users/dashboard/comment"
              className="flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-6 bg-gray-50 hover:bg-color-accent dark:bg-slate-700/50 dark:hover:bg-color-accent text-gray-700 hover:text-white dark:text-gray-200 dark:hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="p-3 md:p-4 bg-white dark:bg-slate-800 text-color-accent rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <ChatTeardropText size={32} weight="duotone" className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <span className="font-bold text-sm md:text-lg text-center">Komentar Saya</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
