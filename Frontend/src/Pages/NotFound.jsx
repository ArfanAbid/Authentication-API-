import React from "react";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";


export const NotFound = () => {
  return (
      <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-2xl md:text-8xl font-bold dark:text-gray-300">404 </h1>
        <p class="text-xl md:text-4xl font-medium dark:text-gray-400">Page Not Found 🌐</p>
        <Link to="/" class="mt-4 text-xl text-[#48e1b1]  hover:underline">
          Go back home
        </Link>
      </div>
  );
};