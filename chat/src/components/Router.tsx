import { useEffect } from 'react'
import { auth } from '../Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

export default function Router() {
   const navigate = useNavigate()
   const [user] = useAuthState(auth)
   console.log(user)
  
   useEffect(() => {

    if (!user) {

      navigate('/Login');
    } else{
        navigate('/Home')
    }
  }, []);
  return(
    <div></div>
  )
}

