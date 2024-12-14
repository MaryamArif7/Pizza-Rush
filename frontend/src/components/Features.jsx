import fresh from "../assets/fresh2.webp";
import fast from "../assets/fast3.webp";
import customize from "../assets/fresh.jpg";

const Features = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-lobster text-4xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent mb-6">
          Why Choose Us?
        </h2>
        <p className="bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent mt-2 font-extrabold text-2xl mb-12">
          Here’s why thousands of pizza lovers trust us with their cravings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
          <div
            className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-110"
            style={{
              boxShadow: "0 0 20px 5px rgba(255, 0, 100, 0.5)",
            }}
          >
            <img
              src={fresh}
              alt="Fresh Ingredients"
              className="w-56 h-56 object-cover mx-auto mb-4 rounded-full shadow-2xl"
            />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
              Fresh Ingredients
            </h3>
            <p className=" mt-2">
              We use only the freshest ingredients to make every pizza unforgettable.
            </p>
          </div>

         
          <div
            className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-110 "
            style={{
              boxShadow: "0 0 20px 5px rgba(204, 193, 0, 0.9)" ,
            }}
          >
            <img
              src={customize}
              alt="Customizable Pizzas"
              className="w-56 h-56 object-cover mx-auto mb-4 rounded-full shadow-2xl"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
              Customizable Pizzas
            </h3>
            <p className=" mt-2">
              Fully customizable options to suit your unique taste preferences.
            </p>
          </div>

          
          <div
            className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-110"
            style={{
              boxShadow: "0 0 20px 5px rgba(0, 115, 0, 0.7)",
            }}
          >
            <img
              src={fast}
              alt="Fast Delivery"
              className="w-56 h-56 object-cover mx-auto mb-4 rounded-full shadow-2xl"
            />
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
              Fast Delivery
            </h3>
            <p className=" mt-2">
              Hot and fresh, straight to your door in record time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
