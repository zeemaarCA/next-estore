"use client";

import { MdOutlineWbSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useTheme } from "next-themes";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

	return (
    <>
      <div>
      {theme === "dark" ? (
        <div
          className="flex rounded-full p-2 border-2 dark:border-gray-600 border-solid cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <MdOutlineWbSunny className="h-4 w-4 dark:text-gray-200 sm:h-4 sm:w-4" />
        </div>
      ) : (
        <div
          className="flex rounded-full p-2 border-2 border-gray-300 border-solid cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <BsFillMoonStarsFill className="h-4 w-4 text-gray-400 sm:h-4 sm:w-4" />
        </div>
      )}
    </div>
		</>
	);
}
