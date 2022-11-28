import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartSlideOver from './components/Cart-Slide-Over'

export default function Navbar(props) {
  const [theme, setTheme] = useState(null);
  const [open, setOpen] = useState(false);

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
          <div className="flex items-center hover:text-gray-400">
            <div
              className="hover:cursor-pointer inline-flex "
              onClick={handleThemeSwitch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 dark:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
            <button
              className="py-4 mx-5 relative border-2 border-transparent text-white rounded-full hover:text-gray-400 ease-in-out"
              onClick={()=> setOpen(true)}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className="absolute inset-0 object-right-top -mr-6">
                <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  6
                </div>
              </span>
            </button>
            <Link
              to="/login"
              className="text-sm font-medium text-black-600 dark:text-white hover:underline"
            >
              Login
            </Link>
            <Link
              to="/"
              className="text-gray-900 pl-5 dark:text-white hover:underline"
              aria-current="page"
            >
              Home
            </Link>
          </div>
          <CartSlideOver open={open} setOpen={setOpen} title="Cart">
            <Button>OK</Button>
          </CartSlideOver>
        </div>
      </nav>
    </>
  );
}
