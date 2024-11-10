import { useEffect, useState } from "react";
import axios from 'axios';
import MenuCard from "./MenuCard";
import { useSelector,useDispatch } from "react-redux";
import { getMenuDetails } from "../redux/menuSlice";
import { addToCart, fetchCartItems } from "../redux/cartSlice";
import toast from "react-hot-toast";
const Menu = () => {
  const [menu, setMenu] = useState([]);
 const dispatch=useDispatch();
const {user}=useSelector((state)=>state.auth)
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

function handleAddtoCart(getMenuId){
dispatch(
  addToCart({
  id:user?.id,
  menuId:getMenuId,
  quantity:1

})
).then((data)=>{
if(data?.payload?.success){
  dispatch(fetchCartItems(user?.id));
  toast({title:"Your Pizza is added to the Cart"})
}


});
}
function handleGetManuDetails(getMenuId){
    dispatch(getMenuDetails(getMenuId));
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
              handleAddtoCart={handleAddtoCart}
              handleGetManuDetails={handleGetManuDetails}
              menu={item}
              
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
