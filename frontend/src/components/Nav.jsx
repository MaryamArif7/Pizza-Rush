import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-7.png";
import {
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Nav = () => {
  const navigate=useNavigate();
  const loginClick=()=>{
  navigate('/register');
  }
  

  return (
    <div className=" flex justify-between items-center px-10 font-medium text-lg">
      <img className="w-28 h-28" src={logo} alt="Logo" />

      <div className="flex-1">
        <ul className="flex justify-center gap-5">
          <li>
            <Link className="font-lobster font-medium text-2xl" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="font-lobster font-medium text-2xl" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="font-lobster font-medium text-2xl" to="/about">
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex gap-5">
          <li>
            <button>
              {" "}
              <ShoppingCartIcon className="h-8 w-8 " />
            </button>
          </li>
          <li>
            <button>
              {" "}
              <MagnifyingGlassIcon className="h-8 w-8 " />
            </button>
          </li>
          <li>
            <button onClick={loginClick}>
              <ArrowRightOnRectangleIcon className="h-8 w-8" />
            </button>
          </li>
          <li>
            <button>
              <UserCircleIcon className="h-8 w-8 " />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
