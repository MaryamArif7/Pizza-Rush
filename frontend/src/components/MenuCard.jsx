const MenuCard = ({image,name,price,description}) => {
  return (
    <div className="ml-10">
      <div className="h-max w-72 bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-contain"
        />

        <div className="p-5">
          <h3 className="text-xl text-center font-semibold text-gray-800">
            {name}
          </h3>
          <p className="text-center mt-2 text-gray-600">
            {description}
          </p>
          <hr className="border-red-300 my-4" />

          <div className="flex justify-between">
            <h1 className="mt-4 text-lg">Rs {price}</h1>
            <h1 className="mt-4 text-lg bg-orange-600 text-white px-2 rounded-lg">
              Save 30% off
            </h1>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-yellow-400 to-red-600 text-lg rounded-lg hover:bg-red-700 mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;