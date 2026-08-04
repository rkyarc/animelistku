import { Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";

const gabarito = Gabarito({
  subsets: ["latin"],
});

export const metadata = {
  title: "AnimeListKu",
  description: "Website Anime Indonesia",
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
