import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../App.css";
import Navbar from "../screens/navbar";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 8;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    console.log(selected);
  };

  const navigate = useNavigate();
  const url = "https://fakestoreapi.com/products";
  const fetchData = () => {
    return axios.get(url).then((response) => {
      setData(response.data);
      setSearchData(response.data);
    });
  };

  const searchFunction = (searchText) => {
    if (!searchText) setData(searchData);
    const results = searchData.filter((item) => {
      return item.title.toLowerCase().includes(searchText);
    });
    setData(results);
  };

  function keyPressed(evt) {
    if (evt.keyCode === 27) {
      console.log("key oresadasdasd");
      document.getElementById("search").value = "";
      setData(searchData);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <p className="text-black text-4xl font-bold flex flex-wrap justify-between items-center mx-auto py-10">
          Products
        </p>

        <div className="sm:flex sm:flex-row sm:w-full">
          <form className="sm:w-full pb-10 mx-auto max-w-screen-xl">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="search"
                onKeyDown={(evt) => keyPressed(evt)}
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 
							 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black-500
							 dark:focus:border-black-500"
                placeholder="Search..."
                onChange={(event) => searchFunction(event.target.value)}
              />
            </div>
          </form>
        </div>

        <div className="sm:grid sm:grid-cols-4 sm:gap-10 sm:px-10 items-center justify-center">
          {data.length < 1 ? (
            <div className="pb-24">
              <PacmanLoader color="#4B5563" size={50} />
            </div>
          ) : (
            data
              .slice(pagesVisited, pagesVisited + itemsPerPage)
              .map((info) => {
                return (
                  <div
                    id={info.id}
                    onClick={() => navigate(`/${info.id}`)}
                    className="sm:overflow-hidden sm:h-[450px] sm:w-[300px] shadow-lg mt-10 mb-5 sm:mx-0 mx-24 cursor-pointer dark:bg-gray-700 border-black border-2 items-center justify-center"
                  >
                    <img className="h-[200px] w-full" src={info.image} alt="" />
                    <div className="sm:px-6 sm:py-2 px-10 py-5 mb-10">
                      <p className="font-bold text-xl mb-5 dark:text-white h-24 truncate">
                        {info.title}
                      </p>
                      <p className="text-red-500 font-bold text-lg">
                        PKR: {info.price}
                      </p>
                      <p className="text-gray-700 text-base dark:text-white">
                        Rating: {info.rating.rate}
                      </p>
                      <p className="text-gray-700 text-base dark:text-white">
                        Category: {info.category.toUpperCase()}
                      </p>
                    </div>
                  </div>
                );
              })
          )}
        </div>
        <div className="App">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
}
