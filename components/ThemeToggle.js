import { useEffect, useState } from "react";
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

export default function ThemeToggle({ className }) {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const handleChangeTheme = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {theme == 'dark' ?
        <button onClick={() => setTheme('light')} aria-label="Light" className={className}>
          <SunIcon className="h-[21px] w-[21px] text-neutral-300 hover:text-neutral-100 transition-all" />
        </button>
        :
        <button onClick={() => setTheme('dark')} aria-label="Dark" className={className}>
          <MoonIcon className="h-[21px] w-[21px] text-neutral-600 hover:text-neutral-800 transition-all" />
        </button>
      }

      {/* <button onClick={handleChangeTheme} aria-label="Change Theme" className={`${theme == 'dark' ? "bg-neutral-800" : "bg-gray-200"} relative flex gap-1 items-center px-1 py-0.5 rounded-full h-7`}>
        <span className="absolute w-5 h-5 rounded-full bg-blue-500 dark:left-[1.6rem] left-1.5 transition-all"></span>
        <span aria-hidden={true}><SunIcon className={`${theme == 'dark' ? "text-white bg-white" : ""}h-5 w-5`} /></span>
        <span aria-hidden={true}><MoonIcon className="h-5 w-5" /></span>
      </button> */}

      {/* <div onClick={handleChangeTheme} className="transition-all cursor-pointer w-10 h-6 dark:bg-blue-500 bg-neutral-200 rounded-full relative mx-auto mt-8">
        <div className="h-4 w-4 bg-white rounded-full absolute top-1 transition-all dark:left-5 left-1"></div>
      </div> */}
    </>
  )
}