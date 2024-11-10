import { useEffect, useState } from "react";
import axios from 'axios';
import MenuCard from "./MenuCard";
import { useSelector,useDispatch } from "react-redux";
const Menu = () => {
  const [menu, setMenu] = useState([]);
 const dispatch=useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenu(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, []);
function handleAddtoCart(){

}
function handleGetManuDetails(){

}
 return (
    <>
      <div className="mt-20">
        <div>
          <h1 className="text-center text-6xl font-lobster font-extrabold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
            Explore Menu
          </h1>
          <p className="text-center text-lg mt-5">We offer all types of Pizzas</p>
        </div>
        <div>
          <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
            {menu.map((item) => (
              <MenuCard key={item._id} {...item} 
              
              
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
