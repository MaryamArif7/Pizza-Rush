import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import { registerUser } from '../helper/helper'

export default function Register() {

  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues: {
      email: 'doyol56239@cnogs.com',
      username: 'example123',
      password: 'admin@123',
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const registerMessage = await registerUser(values);
        toast.success(registerMessage); 
        navigate('/');
      } catch (error) {
        toast.error(error.message || "Could not Register."); 
      }
    },
  })
  return (
    <div className="bg-[url('/src/assets/login4.png')] bg-cover bg-center">
      <div className="container mx-auto">

<Toaster position='top-center' reverseOrder={false}></Toaster>

<div className='flex  items-center h-screen w-3/4'>
  <div className="bg-[rgba(255,255,255,0.55)] rounded-[16px] shadow-[0_4px_30px_rgba(71,71,71,0.11)] backdrop-blur-[7.1px] border border-[rgba(255,255,255,0.3)]  border-gray-50 shrink-0 h-[75%] w-[30%]  py-20 px-7 min-w-max" style={{ width: "45%", paddingTop: '3em'}}>

    <div className="title flex flex-col items-center">
      <h4 className='bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent text-4xl font-bold'>Register</h4>
      
    </div>

    <form className='py-1' onSubmit={formik.handleSubmit}>
     

        <div className=" flex flex-col  mt-5 items-center gap-6">
            <input {...formik.getFieldProps('email')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none"type="text" placeholder='Email*' />
            <input {...formik.getFieldProps('username')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Username*' />
            <input {...formik.getFieldProps('password')} className="border-0 px-3 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="password" placeholder='Password*' />
            <button className=" bg-gradient-to-r from-yellow-400 to-red-600 text-lg  hover:bg-red-700 mt-2 text-center rounded-lg border px-10 py-3" type='submit'>Register</button>
        </div>

        <div className="text-center py-4">
          <span >Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
        </div>

    </form>

  </div>
</div>
</div>
    </div>
   
  )
}
