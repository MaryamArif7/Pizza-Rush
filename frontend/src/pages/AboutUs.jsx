import Footer from "../components/Footer"
import Nav from "@/components/Nav";
import team from "../assets/team.png";

const AboutUs = () => {
  return (
    <div>
      <Nav />
      <div className="mx-auto bg-white h-auto w-full sm:w-2/3 mt-10 flex flex-col sm:flex-row items-center sm:items-start px-5 sm:px-0">
        <div className="text-center sm:text-left">
          <h1 className="mt-10 text-center bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent font-extrabold text-4xl">
            About Us
          </h1>
          <p className="text-center sm:text-left mt-7 text-xl">
            Our mission is to serve the best pizza to our customers with love and
            care. We believe in providing excellent customer service, quick delivery,
            and creating an unforgettable dining experience.
          </p>
        </div>
        <div className="mt-7 sm:mt-0 sm:ml-10">
          <img className="rounded-2xl w-full sm:w-auto" src={team} alt="Our Team" />
        </div>
      </div> 
      <div className="mt-20">
      <Footer  />
      </div>
  
    </div>
  );
};

export default AboutUs;
