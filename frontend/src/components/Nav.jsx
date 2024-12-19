import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-7.png";
import {
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet } from "../components/ui/sheet";
import CartWrapper from "../components/cartWrapper";
import { fetchCartItems } from "../redux/cartSlice";
import { useToast } from "./ui/use-toast";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLoginClick = () => {
    navigate("/register");
  };
  console.log("HELLO FROM NAV CHECKING CART ITEMS", cartItems);
  useEffect(() => {
    dispatch(fetchCartItems(user?._id)).catch((error) =>
      console.error("Failed to fetch cart items:", error)
    );
  }, [dispatch]);
  console.log("checking useEffect from the nav ", user._id);

  return (
    <div className="flex justify-between items-center px-5 sm:px-10 font-medium text-lg">
    <img className="w-20 h-20 sm:w-28 sm:h-28" src={logo} alt="Logo" />
  
  
    <div className="sm:block flex-col sm:flex-row justify-center gap-3 sm:gap-5">
      <ul className="flex flex-row sm:flex-row justify-center gap-3 sm:gap-5">
        <li>
          <Link
            to="/"
            className="font-lobster font-medium text-xl sm:text-2xl hover:text-yellow-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="font-lobster font-medium text-xl sm:text-2xl hover:text-yellow-500"
            to="/Contact"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            className="font-lobster font-medium text-xl sm:text-2xl hover:text-yellow-500"
            to="/AboutUs"
          >
            About Us
          </Link>
        </li>
      </ul>
    </div>
  
    {/* Hamburger Icon for Mobile */}
    <div className="sm:hidden flex items-center">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-3xl"
      >
        {isMenuOpen ? '×' : '☰'}
      </button>
    </div>
  
    
    <div className={`sm:flex ${isMenuOpen ? 'block' : 'hidden'} sm:block gap-3 sm:gap-5`}>
      <ul className="flex gap-3 sm:gap-5">
        <li>
          <Sheet
            open={openCartSheet}
            onOpenChange={() => setOpenCartSheet(false)}
          >
            <button
              onClick={() => setOpenCartSheet(true)}
              className="relative"
            >
              <ShoppingCartIcon
                title="Add To Cart"
                className="h-7 w-7 sm:h-8 sm:w-8 hover:text-orange-400"
              />
              <span className="absolute top-[-10px] right-[2px] font-bold text-sm text-red-700">
                {cartItems?.items?.length || 0}
              </span>
              <span className="sr-only">User cart</span>
            </button>
            <CartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={
                cartItems && cartItems.items && cartItems.items.length > 0
                  ? cartItems.items
                  : []
              }
            />
          </Sheet>
        </li>
        <li>
          <button>
            <MagnifyingGlassIcon
              title="Search what you want"
              className="h-7 w-7 sm:h-8 sm:w-8 hover:text-orange-600"
            />
          </button>
        </li>
        <li>
          <button onClick={handleLoginClick}>
            <ArrowRightOnRectangleIcon
              title="Login/Register"
              className="h-7 w-7 sm:h-8 sm:w-8 hover:text-orange-600"
            />
          </button>
        </li>
        <li>
          <button>
            <UserCircleIcon
              title="Your Account"
              className="h-7 w-7 sm:h-8 sm:w-8 hover:text-orange-600"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
  
  );
};

export default Nav;
