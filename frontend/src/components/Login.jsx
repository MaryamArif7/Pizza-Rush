import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { passwordValidate } from '../helper/validate'
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";
import axios from 'axios';
import {setUser} from "../redux/authSlice"


const Login = () => {

  const navigate = useNavigate();
const dispatch=useDispatch();
//const {user}=useSelector(store=>store.auth);

  const formik = useFormik({
    initialValues : {
      username : 'Maryam7777',
      password:'maryam@77'
    },
  
    validate : usernameValidate,passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      try {
        
        const res = await axios.post("http://localhost:5000/api/login",{ username:values.username, password: values.password},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true,
    



         });
         if(res.data.success){
      dispatch(setUser(res.data.user));
         }
      
        const { token } = res.data;
        localStorage.setItem('token', token);
        toast.success('Login Successfully...!');
        navigate('/');
    } catch (error) {
        toast.error('Password Not Match!');
        console.error("Error during login:", error);
    }
    }
  })

  return (
    <div className="bg-[url('/src/assets/login4.png')] bg-cover bg-center">
  
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex  items-center h-screen'>
        <div className="bg-white/55 rounded-2xl shadow-[0_4px_30px_rgba(71,71,71,0.05)] backdrop-blur-[7.1px]  border-white/30 border-4 border-gray-50 shrink-0 h-3/4 w-[30%]  py-20 px-7 min-w-max">

          <div className="title flex flex-col items-center">
            <h4 className='bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent text-4xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center '>
              Explore and order
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className="border-2 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Username' />
                  <input {...formik.getFieldProps('password')} className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Password' />
                  <button className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]" type='submit'>Sign In</button>
               
              </div>

              <div className="text-center py-4">
                <span >Fisrt Time? <Link className='text-red-600' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Login