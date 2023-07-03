import { auth } from "../Firebase";
import { MessageProps } from "../chat.types";


function Message({message}: MessageProps) {
  const currentUser = auth.currentUser;
  const style = currentUser && message.uid === currentUser.uid ? 'sent' : '';

   
    
 
 


  return (
    <div className={style + ' ' + 'MessageCont'}>
     <span className='Sender'>Leaf</span>
     <div className='TextCont'>
       {message.text}
     </div>
    </div>
  )
}

export default Message