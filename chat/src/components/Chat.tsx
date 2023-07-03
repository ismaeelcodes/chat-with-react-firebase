import { useEffect, useState } from 'react'
import Message from './Message'
import { database } from '../Firebase'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import SendMessage from './SendMessage'
import { MessageType } from '../chat.types'

function Chat() {
   
    const [userMessages, setUserMessages] = useState<any>([])


    useEffect(() => {
     const messageColl = query(collection(database, 'messages'), orderBy('createdAt'));
     const snapChange = onSnapshot(messageColl, (messageSnapshot) => {
        let tempMSGS: MessageType[] = [];

messageSnapshot.forEach((ourMessage: any) => {
  tempMSGS.push({ ...ourMessage.data(), id: ourMessage.id });
});

setUserMessages(tempMSGS);
     })
    
      return () => snapChange()
    }, [])


  return (
    <div className='ChatCont'>
    <div >
    {userMessages && userMessages.map((message: any) => (
  <Message key={message.id} message={message} />
))}
    </div>
    <div>
   <SendMessage />
    </div>
    </div>
  )
}

export default Chat