const MenuCard = ({ image, name, price, description, handleAddtoCart, handleGetMenuDetails, menu }) => {
  return (
    <div className="ml-10">
      <div className="h-max w-72 bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={`http://localhost:5000/${image}`}
          alt={name}
          className="w-full h-48 object-fit"
        />
        <div className="p-5">
          <h3 className="text-xl text-center font-semibold text-gray-800">
            {name}
          </h3>
          <p className="text-center mt-2 text-gray-600">{description}</p>
          <hr className="border-red-300 my-4" />
          <div className="flex justify-between">
            <h1 className="mt-4 text-lg">Rs {price}</h1>
            <h1 className="mt-4 text-lg bg-orange-600 text-white px-2 rounded-lg">
              Save 30% off
            </h1>
          </div>
          <button
            onClick={() => handleAddtoCart(menu?._id)}
            className="w-full py-2  bg-gradient-to-r from-yellow-400 to-red-600 text-lg rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-400 mt-4"
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleGetMenuDetails(menu?._id)}
            className="w-full py-2 bg-gradient-to-r from-yellow-400 to-red-600 text-lg rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-yellow-400 mt-4"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
