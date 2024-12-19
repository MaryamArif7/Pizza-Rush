import React, { useRef } from "react";
import pizza1 from "../assets/pizza-1.png";
import pizza4 from "../assets/pizza-4.png";
import Menu from "./Menu";
import Nav from "./Nav";
import Features from "./Features";
import Customized from "./Customized";
import Footer from "./Footer";

const Home = () => {
  const menuRef = useRef(null);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav />
      <div className="text-center">
        <h1 className="font-lobster text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
          Fresh, Hot & Fast
        </h1>
        <p className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent mt-2 font-extrabold text-xl md:text-4xl font-anton">
          From oven to doorstep, quality in every bite.
        </p>
        <p className="mt-3 font-lobster font-semibold text-sm md:text-lg">
          At Pizza Rush, every pizza is a masterpiece. Made with fresh
          ingredients and a passion for flavor,{" "}
          <br className="hidden md:block" />
          pizzas are designed for every taste. Whether you want to explore bold
          new flavors, <br className="hidden md:block" />
          we’ve got the perfect pizza for you.
        </p>

        <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center">
          <div className="flex-1 flex justify-center">
            <img
              src={pizza1}
              className="w-3/4 sm:w-1/2 md:w-3/5 block sm:hidden"
              alt="Pizza 1"
            />
            <img
              src={pizza1}
              className="w-3/4 sm:w-1/2 md:w-3/5 hidden sm:block"
              alt="Pizza 1"
            />
          </div>

          <button
            onClick={scrollToMenu}
            className="mx-auto mt-4 px-6 py-3 sm:mx-4 sm:mt-0 sm:px-8 sm:py-4 bg-gradient-to-r from-yellow-400 to-red-600 text-base sm:text-lg rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-400"
          >
            Order Now
          </button>

          <div className="flex-1 flex justify-center hidden sm:flex">
            <img src={pizza4} className="w-3/4 sm:w-1/2 md:w-3/5" alt="Pizza 4" />
          </div>
        </div>
      </div>

      <div ref={menuRef}>
        <Menu />
      </div>

      <div className="mt-20">
        <Features />
      </div>
      <Footer />
    </>
  );
};

export default Home;
