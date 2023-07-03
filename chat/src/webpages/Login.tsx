
import GoogleButton from 'react-google-button'
import '../App.css'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import { auth } from '../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
    const [user] = useAuthState(auth)
  if(user){
    navigate('/Home')
  }


  function loginGoogleAgent(){
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  

  

  return (
    <div className='login-buttons width-100 flex justify-center'>
       
       <GoogleButton onClick={loginGoogleAgent}/>

    </div>
  )
}

export default Login