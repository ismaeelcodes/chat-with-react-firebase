import { useState } from 'react';
import { auth, database, storage } from '../Firebase';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

function SendMessage() {
  const [messageInput, setMessageInput] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

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

    if (messageInput === '' && !imageFile) {
      return;
    }

    const { uid, displayName } = user;

    if (imageFile) {
      try {
        const storageRef = ref(storage, `images/${imageFile.name + Math.floor( Math.random() * 100 )}`);
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
      <input type='file' accept='image/*' onChange={handleChange} className='ImageInput' />
      <button type='submit' className='SendButton'>Send Message</button>
    </form>
  );
}

export default SendMessage;
