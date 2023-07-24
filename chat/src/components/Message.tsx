// Message.tsx
import { auth } from "../Firebase";
import { MessageProps } from "../chat.types";

function Message({ message }: MessageProps) {
  const currentUser = auth.currentUser;
  const style = currentUser && message.uid === currentUser.uid ? 'sent' : '';

  return (
    <div className={style + ' ' + 'MessageCont'}>
      <span className='Sender'>{message.name}</span>
      <div className='TextCont'>
        {message.text ? message.text : message.imageUrl && (<img className="ImageEmbed" src={message.imageUrl} alt='Uploaded' />)}
        {message.voiceMessageUrl && (
          <audio controls>
            <source src={message.voiceMessageUrl} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
}

export default Message;
