import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../screens/navbar";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Details() {
  const params = useParams();

  const [data, setData] = useState([]);
  let [num, setNum] = useState(0);
  const url = `https://fakestoreapi.com/products/${params.id}`;

  const fetchData = useCallback(() => {
    return axios.get(url).then((response) => {
      setData(response.data);
      return response;
    });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (num > 0) {
      setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <div className="h-screen dark:bg-gray-500 font-nunito items-center justify-center">
      <Navbar />
      {data.length < 1 ? (
        <div className="sm:pt-60 sm:pl-[600px] pt-56 pl-28">
          <PacmanLoader color="#4B5563" size={50} />
        </div>
      ) : (
        <div className="sm:flex sm:flex-row">
          <img
            className="py-10 px-10 w-[500px] h-[500px] dark:bg-gray-500"
            src={data?.image}
            alt=""
          />
          <div className="px-10 sm:my-10 dark:bg-gray-500">
            <h1 className="pt-5 text-3xl font-bold dark:text-white">
              {data?.title}
            </h1>
            <div className="pt-10">
              <p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
                Description:
                <p className="font-thin text-black pl-5 dark:text-white">
                  {data?.description}
                </p>
              </p>
              <p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
                Price:
                <p className="font-thin text-black pl-5 dark:text-white">
                  {data?.price} USD
                </p>
              </p>

              <p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
                Rating:
                <p className="font-thin text-black pl-5 dark:text-white">
                  {data?.rating?.rate}/5
                </p>
              </p>

              <p className="text-base font-medium flex flex-row pb-3 sm:pb-0 dark:text-white">
                Category:
                <p className="font-thin text-black pl-5 dark:text-white">
                  {data?.category}
                </p>
              </p>
            </div>
            <div className="flex flex-row h-10 mt-10 rounded-lg border border-black dark:border-white w-fit">
              <div className="">
                <button
                  className="text-3xl px-3"
                  type="button"
                  onClick={decNum}
                >
                  -
                </button>
              </div>
              <input
                type="text"
                className="w-12 dark:bg-white pl-[17px] bg-slate-400"
                value={num}
                disabled
                onChange={handleChange}
              />
              <div>
                <button className="text-3xl px-3" type="button" onClick={incNum}>
                  +
                </button>
              </div>
            </div>
            <div
              className="bg-white dark:bg-amber-500 px-3 my-5 py-2 
					shadow-md dark:shadow-amber-600 shadow-black
					text-black dark:text-slate-700
					flex flex-row w-fit dark:hover:bg-amber-600 hover:bg-slate-400 hover:cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-black dark:text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
