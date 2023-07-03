
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from 'react-router-dom'
import Chat from '../components/Chat'

function Home() {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
  if(!user){
    navigate('/')
  }

  return (
   <div className='flex flex-column align-center'>
    <div className='width-100 signOutCont'>
        <button onClick={() => signOut(auth)} className='signOutBtn'>Sign Out</button>
    </div>
    <Chat />
    </div> 
  )
}

export default Home