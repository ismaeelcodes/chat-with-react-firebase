import { useState } from 'react';
import { auth, database, storage } from '../Firebase';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { ReactMic, ReactMicStopEvent } from 'react-mic';
import 'react-h5-audio-player/lib/styles.css';


function SendMessage() {
  const [messageInput, setMessageInput] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [voiceMessageBlob, setVoiceMessageBlob] = useState<Blob | null>(null);
  const [voiceMessageError, setVoiceMessageError] = useState<string | null>(null);
  const [hasVoiceMSG, setHasVoiceMSG] = useState<boolean>(false)

  function handleStartRecording() {
    setRecording(true);
    setVoiceMessageBlob(null);
    setVoiceMessageError(null);
  }

  function handleStopRecording(recordedData: ReactMicStopEvent | null) {
    setRecording(false);
    setHasVoiceMSG(true)
    if (recordedData!.blob) {
      setVoiceMessageBlob(recordedData!.blob);
      
    }
  }
  


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.type === 'file') {
      const file = e.target.files?.[0] || null;
      setImageFile(file);
    } else {
      setMessageInput(e.target.value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    if (messageInput === '' && !imageFile && !voiceMessageBlob) {
      return;
    }

    const { uid, displayName } = user;

    if (imageFile) {
      try {
        const storageRef = ref(storage, `images/${imageFile.name + Math.floor(Math.random() * 100)}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(snapshot.ref);

        await addDoc(collection(database, 'messages'), {
          imageUrl,
          name: displayName,
          uid,
          createdAt: serverTimestamp()
        });

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else if (voiceMessageBlob) {
      try {
        const storageRef = ref(storage, `voice-messages/${new Date().getTime()}`);
        const snapshot = await uploadBytes(storageRef, voiceMessageBlob);
        const voiceMessageUrl = await getDownloadURL(snapshot.ref);

        await addDoc(collection(database, 'messages'), {
          voiceMessageUrl,
          name: displayName,
          uid,
          createdAt: serverTimestamp()
        });

      } catch (error) {
        console.error('Error uploading voice message:', error);
      }
    } else {
      await addDoc(collection(database, 'messages'), {
        text: messageInput,
        name: displayName,
        uid,
        createdAt: serverTimestamp()
      });

      setMessageInput('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className='MessageForm'>
      <input value={messageInput} type='text' placeholder='Message in Chat' onChange={handleChange} className='MessageInput' />
      <input type='file' accept='image/*' onChange={handleChange} className='ImageInput'></input>
      <ReactMic
        record={recording}
        className='sound-wave'
        onStop={handleStopRecording}
        onData={(data: any) => console.log('chunk of real-time data', data)}
        strokeColor='#000000'
        backgroundColor='#FF4081'
      />
      {voiceMessageError && <div>Error: {voiceMessageError}</div>}
   
      <button type='button' onClick={recording ? () => handleStopRecording(null) : handleStartRecording}>
        {recording ? 'Stop Recording' : hasVoiceMSG ? 'Voice Message Recorded' : 'Start Recording'}
      </button>
      <button type='submit' className='SendButton'>Send Message</button>
    </form>
  );
}

export default SendMessage;
