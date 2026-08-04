import Link from "next/link";

const Header = ({ title, linkHref, linkTitle }) => {
  return (
    <div className="p-3 flex justify-between items-center bg-color-accent text-white mt-5 mb-4 rounded-lg shadow-sm">
      <h1 className="text-lg md:text-xl font-bold tracking-wide">{title}</h1>
      {
      linkHref && linkTitle ? 
      <Link
        href={linkHref}
        className="md:text-sm text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 hover:bg-white hover:text-color-accent transition-all"
      >
        {linkTitle}
      </Link>
      : null
      }
    </div>
  );
};

export default Header;