import React from "react";

const Home = () => {
  return (
    <>
      <div>
        <div className="">
          <h1 className="font-lobster text-center text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
            Fresh, Hot & Fast
          </h1>
          <p className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent mt-2 font-extrabold text-4xl font-anton text-center">
            From oven to doorstep, quality in every bite.
          </p>
          <p className="text-center font-anton font-semibold mt-3 ">
          At Pizza Rush, every pizza is a masterpiece. Made with  fresh ingredients, and a passion for flavor, <br />  pizzas are designed  for  every taste.  Whether you  want to explore bold new flavors, <br /> we’ve got the perfect pizza for you
          </p>
          <div className="flex justify-center">
          <button className="  mt-6 px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-600  text-lg rounded-lg hover:bg-red-700">
        Order Now
      </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
