import { Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const gabarito = Gabarito({
  subsets: ["latin"],
});

export const metadata = {
  title: "AnimeListKu - Platform Tracker Anime",
  description: "Website Anime Indonesia. Temukan, simpan, dan beri ulasan pada anime favoritmu dengan mudah.",
  keywords: ["anime", "animelist", "anime indonesia", "jikan api"],
  openGraph: {
    title: "AnimeListKu",
    description: "Website Anime Indonesia untuk tracking anime favoritmu.",
    url: "https://animelistku.vercel.app",
    siteName: "AnimeListKu",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${gabarito.className} bg-color-dark text-color-primary transition-colors duration-300`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <Navbar />
          <section className="max-w-5xl mx-auto min-h-screen px-4 md:px-0 transition-colors duration-300">
            {children}
          </section>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
