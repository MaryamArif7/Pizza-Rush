import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate'
import { useAuthStore } from '../store/store'
export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues : {
      username : 'Maryam7777'
    },
    validate : usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      setUsername(values.username);
      navigate('/password')
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
                  <button className="bg-gradient-to-r from-yellow-400 to-red-600 text-lg  hover:bg-red-700 mt-2 text-center rounded-lg border px-14 py-3" type='submit'>Next</button>
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