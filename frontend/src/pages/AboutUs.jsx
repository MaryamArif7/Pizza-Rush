import React from "react";
import Nav from "@/components/Nav";
import team from "../assets/team.png"
const AboutUs = () => {
  return (
    <div>
      <Nav />
      <div className="ml-48 bg-white h-96 w-2/3 mt-10 flex">
        <div>
            <h1 className=" mt-10 text-center bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent font-extrabold text-4xl ">About Us</h1>
            <p className="text-center mt-7 text-xl  ">
            Our mission is to serve the best pizza to our customers with love and
          care. We believe in providing excellent customer service, quick delivery,
          and creating an unforgettable dining experience.
            </p>
        </div>
        <div>
            <img className="rounded-2xl" src={team} />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
