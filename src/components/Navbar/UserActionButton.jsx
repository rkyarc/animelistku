import { authUserSession } from "@/libs/auth-libs";
import Link from "next/link";

const UserActionButton = async () => {
  const user = await authUserSession();
  const actionLabel = user ? "Sign Out" : "Sign In"
  const actionURL = user ? "/logout" : "/login"

  return (
    <div className="flex gap-2 justify-between items-center py-1">
        {
            user ? <Link href="/users/dasboard" className="bg-transparent text-white border border-white py-1 px-4 md:px-5 text-sm md:text-base inline-block rounded-full hover:bg-white hover:text-color-accent transition-all font-semibold">Dashboard</Link> : null
        }
      <Link href={actionURL} className="bg-white text-color-accent py-1 px-4 md:px-5 text-sm md:text-base inline-block rounded-full shadow hover:bg-gray-200 transition-colors font-semibold">
        {actionLabel}
      </Link>
    </div>
  );
};

export default UserActionButton;
