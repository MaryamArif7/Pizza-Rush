import { useEffect, useState } from "react";
import axios from "axios";
import MenuCard from "./MenuCard";
import MenuDialog from "./MenuDialog";
import { useSelector, useDispatch } from "react-redux";
import { getMenuDetails } from "../redux/menuSlice";
import { addToCart, fetchCartItems } from "../redux/cartSlice";
import toast from "react-hot-toast";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { menuDetails } = useSelector((state) => state.menu);


console.log(menuDetails);
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

  function handleAddtoCart(getMenuId) {
    console.log("hello from handleaddtocart",{
      id: user?._id,
      menuId: getMenuId,
      quantity: 1,
    });
    dispatch(
      addToCart({
        id: user?._id,
        menuId: getMenuId,
        quantity: 1,
      })
    ) .then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?._id));
        toast({
          title: "Product is added to cart",
        })}});
 
    
  }

  function handleGetMenuDetails(getMenuId) {
    dispatch(getMenuDetails(getMenuId))
      .then(() => {
        setOpenDetailsDialog(true);
      });
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
              <MenuCard
                key={item._id}
                {...item}
                handleAddtoCart={handleAddtoCart}
                handleGetMenuDetails={handleGetMenuDetails}
                menu={item}
              />
            ))}
          </div>
        </div>
        {menuDetails && (
          <MenuDialog
            open={openDetailsDialog}
            setOpen={setOpenDetailsDialog}
            menuDetails={menuDetails}
          />
        )}
      </div>
    </>
  );
};

export default Menu;
