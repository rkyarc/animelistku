import { Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const gabarito = Gabarito({
  subsets: ["latin"],
});

export const metadata = {
  title: "AnimeListKu",
  description: "Website Anime Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.className} bg-color-dark`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <section className="max-w-5xl mx-auto min-h-screen px-4 md:px-0">
          {children}
        </section>
      </body>
    </html>
  );
}
