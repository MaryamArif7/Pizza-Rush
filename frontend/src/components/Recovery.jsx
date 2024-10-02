import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store'

import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'

export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email!');
      return toast.error('Problem while generating OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verify Successfully!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Sending...',
        success: <b>OTP has been send to your email!</b>,
        error: <b>Could not Send it!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
    <div className="container mx-auto ">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className="bg-[rgba(255,255,255,0.55)] rounded-[16px] shadow-[0_4px_30px_rgba(71,71,71,0.11)] backdrop-blur-[7.1px]  border-[rgba(255,255,255,0.3)] border-4 border-gray-50 shrink-0 h-[75%] w-[30%]  py-20 px-7 min-w-max">

          <div className="title flex flex-col items-center">
            <h4 className='bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent text-4xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center mt-4'>
                Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-10' onSubmit={onSubmit}>

              <div className="textbox flex flex-col items-center gap-3">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value) } className="border-0 px-5 py-4 rounded-xl w-3/4 shadow-sm text-lg focus:outline-none" type="text" placeholder='OTP' />
                  </div>

                  <button className="border bg-gradient-to-r from-yellow-400 to-red-600 text-lg  hover:bg-red-700 mt-2 text-center rounded-lg  px-10 py-3 shadow-sm " type='submit'>Recover</button>
              </div>
          </form>

          <div className="text-center py-4">
            <span >Cant get OTP? <button onClick={resendOTP} className='text-red-600'>Resend</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}