import { useContext } from "react";
import Link from "next/link";
import { GlobalContext } from "@utils/GlobalContext";
import { LogoutIcon } from "@heroicons/react/outline";
import Logout from '@utils/logout';

export default function Navbar() {
  const { darkMode, setDarkMode } = useContext(GlobalContext);
  return (
    <div className="px-8 py-3 flex justify-between items-center shadow dark:border-b dark:border-b-neutral-800">
      <Link href="/">
        <a className="text-blue-500 hover:text-blue-700 font-medium">Dashboard</a>
      </Link>
      <div className="flex items-center space-x-4">
        <div onClick={() => setDarkMode(!darkMode)} className="transition-all cursor-pointer w-10 h-6 dark:bg-blue-500 bg-neutral-200 rounded-full relative">
          <div className="h-4 w-4 bg-white rounded-full absolute top-1 transition-all dark:left-5 left-1"></div>
        </div>
        <button
          onClick={Logout}
          className="transition-all py-2 px-2 flex justify-start items-center gap-3 text-sm font-semibold rounded text-red-600 hover:text-red-400"
        >
          <LogoutIcon className="w-4 h-4" />
          Log out
        </button>
      </div>
    </div>
  )
}