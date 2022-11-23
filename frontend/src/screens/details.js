import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../screens/navbar";

export default function Details() {
	const params = useParams();

	const [data, setData] = useState([]);
	const url = `https://fakestoreapi.com/products/${params.id}`;

	const fetchData = () => {
		return axios.get(url).then((response) => {
			setData(response.data);
			return response;
		});
	};
	useEffect(() => {
		fetchData();
	}, []);
	console.log(data);
	return (
		<div className="h-screen w-full dark:bg-gray-500 font-nunito">
			<Navbar />
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

					<div
						className="bg-white dark:bg-amber-500 px-3 my-10 py-2 
					shadow-md dark:shadow-amber-600 shadow-black
					text-black dark:text-slate-700
					flex flex-row w-fit"
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
		</div>
	);
}
