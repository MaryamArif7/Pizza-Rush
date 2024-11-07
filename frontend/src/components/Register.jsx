import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import axios from 'axios';
import { useState } from 'react';

export default function Register() {
  const [page, setPage] = useState('register');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: 'maryam777@gmail.com',
      username: 'maryam7',
      password: 'maryam1306',
      otp: '',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (page === 'register') {
        try {
          const otp = await axios.post('http://localhost:5000/api/auth/send-register-otp', { email: formik.values.email });
          if (otp.data.success) {
            toast.success("OTP sent Successfully");
            setPage('register_otp');
          } else {
            console.log("Error in sending OTP");
            toast.error("Error in sending the OTP");
          }
        } catch (error) {
          console.log('Error sending the OTP (catch block)', error);
        }
      } else if (page === 'register_otp') {
        try {
          const res = await axios.post("http://localhost:5000/api/auth/register", values, {
            headers: { 'Content-Type': "application/json" },
            withCredentials: true,
          });
          if (res.data.success) {
            navigate("/login");
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error.message || "Could not register.");
        }
      }
    }
  });

  const handleSendRegisterOTP = async () => {
    try {
      const otp = await axios.post('http://localhost/api/auth/send-register-otp', { email: formik.values.email });
      if (otp.data.success) {
        toast.success("OTP sent Successfully");
      } else {
        toast.error("Error sending OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <>
      <h1>{page === 'register' ? 'Register' : 'Verify OTP'}</h1>
      <div className="bg-[url('/src/assets/login4.png')] bg-cover bg-center">
        <div className="container mx-auto">
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <div className='flex items-center h-screen w-3/4'>
            <div className="bg-[rgba(255,255,255,0.55)] rounded-[16px] shadow-[0_4px_30px_rgba(71,71,71,0.11)] backdrop-blur-[7.1px] border border-[rgba(255,255,255,0.3)] border-gray-50 shrink-0 h-[75%] w-[30%] py-20 px-7 min-w-max" style={{ width: "45%", paddingTop: '3em' }}>

              <div className="title flex flex-col items-center">
                <h4 className='bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent text-4xl font-bold'>Register</h4>
              </div>

              <form className='py-1' onSubmit={formik.handleSubmit}>
                {page === 'register' &&

                  <div className="flex flex-col mt-5 items-center gap-6">
                    <input name="email" {...formik.getFieldProps('email')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Email*' />
                    <input name="username" {...formik.getFieldProps('username')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Username*' />
                    <input name="password" {...formik.getFieldProps('password')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="password" placeholder='Password*' />
                    <button type="submit" className="capitalize w-full bg-orange p-[4px] rounded-[4px]">Submit</button>

                    <span className="text-center text-gray-500">
                      Already have an account? <Link className="text-linkBlue" to="/login">Login</Link>
                    </span>
                  </div>
                }
                {page === 'register_otp' &&
                  <div className="flex flex-col mt-5 items-center gap-6">
                    <input name="otp" {...formik.getFieldProps('otp')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Enter OTP*' />
                    <button type="submit" className="capitalize w-full bg-orange p-[4px] rounded-[4px]">Submit</button>
                    <p onClick={handleSendRegisterOTP} className="text-linkBlue cursor-pointer">Resend OTP</p>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
