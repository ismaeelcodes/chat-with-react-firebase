import { useState } from 'react'
import { auth, database } from '../Firebase';
import { serverTimestamp,  collection, addDoc } from 'firebase/firestore';


function SendMessage() {
  const [messageInput, setMessageInput] = useState<string>('')
  

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setMessageInput(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    const user = auth.currentUser;
    if(messageInput === ''){
        return;
    }
    
if (!user) {
  // Handle the case when the user is not authenticated
  return;
}

const { uid, displayName } = user;
await addDoc(collection(database, 'messages'), {
    text: messageInput,
    name: displayName,
    uid,
    createdAt: serverTimestamp()
  });

  }

    return (
    <form onSubmit={handleSubmit} className='MessageForm'>
        <input value={messageInput} type='text' placeholder='Message in Chat' onChange={(event) => handleChange(event)} className='MessageInput'/>
        <button type='submit' className='SendButton'>Send Message</button>
    </form>
  )
}

export default SendMessage