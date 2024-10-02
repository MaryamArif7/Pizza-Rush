import  { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook'



export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')

  const formik = useFormik({
    initialValues : {
      password : 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/password') })

    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className="bg-[rgba(255,255,255,0.55)] rounded-[16px] shadow-[0_4px_30px_rgba(71,71,71,0.11)] backdrop-blur-[7.1px]  border-[rgba(255,255,255,0.3)] border-4 border-gray-50 shrink-0 h-[75%] w-[30%]  py-20 px-7 min-w-max" style={{ width : "50%"}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter new password.
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pwd')} className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none"type="text" placeholder='Repeat Password' />
                  <button className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]" type='submit'>Reset</button>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}