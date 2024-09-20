import { Link } from 'react-router-dom';
import logo from '../assets/logo-7.png';

const Nav = () => {
  return (
    <div className=' flex justify-between items-center px-10 font-medium text-lg'>
<img className="w-28 h-28" src={logo} alt="Logo" />

      <div className='flex-1'>
        <ul className='flex justify-center gap-5'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </div>
      <div>
        <ul className='flex gap-5'>
          <li><button>Cart</button></li>
          <li><button>Search</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
