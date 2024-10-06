import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

export default function Password() {

  const navigate = useNavigate()
  //fetching username form the store
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues: {
        password: 'maryam@777'
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
        try {
          //it will get the password then verifypassword function will be called
          //in verifyPassword ->witht he username and password it will hit the 
          //login
          /*
          in the login endpoint->
          it will get the username and password from the req
          then compare the password with the user password then 
          genreate the token 
          ->then from the backend res ,msg,username,token will be get from the res
          */
            const res = await verifyPassword({ username, password: values.password });
            //get the  token from data
            const { token } = res.data;
            localStorage.setItem('token', token);
            toast.success('Login Successfully...!');
            navigate('/');
        } catch (error) {
            toast.error('Password Not Match!');
            console.error("Error during login:", error);
        }
    }
});

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className="bg-[rgba(255,255,255,0.55)] rounded-[16px] shadow-[0_4px_30px_rgba(71,71,71,0.11)] backdrop-blur-[7.1px]  border-[rgba(255,255,255,0.3)] border-4 border-gray-50 shrink-0 h-[75%] w-[30%]  py-20 px-7 min-w-max">

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello { apiData?.username}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='Password' />
                  <button className="border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-[#ff6a6a]" type='submit'>Sign In</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/recovery">Recover Now</Link></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}