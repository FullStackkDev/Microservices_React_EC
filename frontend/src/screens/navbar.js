import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-700">
        <div className="flex flex-wrap justify-between items-center mx-auto px-4 md:px-6 py-2.5">
          <Link className="flex items-center" to="/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 mr-3 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Micro-Service Archtechture
            </span>
          </Link>
          <div className="flex items-center">
            <div
              className="hover:cursor-pointer inline-flex mr-10"
              onClick={handleThemeSwitch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-3 mt-0.5 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>

              <span className="text-3xl sm:text-sm dark:text-white">
                Dark Mode
              </span>
            </div>
            <Link
              to="/login"
              className="text-sm font-medium text-black-600 dark:text-white hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
