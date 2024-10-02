
import pizza1 from '../assets/pizza-1.png';
import pizza4 from '../assets/pizza-4.png';
import Nav from './Nav'

const Home = () => {
  return (
    <>
    <Nav />
      <div className="text-center">
        <h1 className="font-lobster text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
          Fresh, Hot & Fast
        </h1>
        <p className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent mt-2 font-extrabold text-4xl font-anton">
          From oven to doorstep, quality in every bite.
        </p>
        <p className="mt-3 font-anton font-semibold">
          At Pizza Rush, every pizza is a masterpiece. Made with fresh ingredients and a passion for flavor, <br />
          pizzas are designed for every taste. Whether you want to explore bold new flavors, <br />
          we’ve got the perfect pizza for you.
        </p>
 
        <div className="flex items-start justify-between ">
          <div className="flex-1 flex justify-center">
            <img src={pizza1} className="w-3/4" alt="Pizza 1" />
          </div> 
          <button className="mx-4 px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-600 text-lg rounded-lg hover:bg-red-700 mt-4">
            Order Now
          </button>
          <div className="flex-1 flex justify-center">
            <img src={pizza4} className="w-3/4 " alt="Pizza 4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
