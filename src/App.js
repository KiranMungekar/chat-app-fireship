import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Components;
import SignIn from './components/SignIn';


//Hooks;
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
 //Config

});


const auth= firebase.auth();
const firestore= firebase.firestore();




function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="">
      </header>
      <section>
          <ChatRoom /> 
      </section>


    </div>
  );
}


const ChatRoom = () => {
  const messageRef= firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query,{idField:'id'});

  const [formValue, setFormValue]= useState('');

  const dummy= useRef();
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }
  
  return(
      <>
          {/* <SignOut /> */}
          <main >
            {messages && messages.map(msg=> <ChatMessage key={msg.id} message={msg} /> )}
            <div ref={dummy}></div>
          </main>

          <form onSubmit={sendMessage} >
             <input value={formValue} onChange={(e)=> setFormValue(e.target.value)} />
             <button type="submit">Send</button>
          </form>

      </>
  )
};

const ChatMessage = (props)=>{
    const {text, uid, photoURL} = props.message; 

    const messageClass= uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    )
}

const SignOut = ()=>{

  return auth.currentUser && (
      <button onClick={()=>auth.signOut()}>Logout</button>
  );
}

export default App;
