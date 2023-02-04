import useSWR from "swr";
import axios from "axios";
import styles from '../styles/Home.module.css'
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, collection, orderBy, limit, query, serverTimestamp, addDoc, setDoc } from 'firebase/firestore'
import Image from "next/image"
import { GoHubot, GoCheck } from "react-icons/go"

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useEffect, useRef, useState, memo } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
isSupported()

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }
  return (
    <div onClick={signInWithGoogle} className={styles.footerRow}><p className='blogText'>Sign in with Google</p></div>
  )
}

function SignOut() {
  return auth.currentUser &&  (
    <div onClick={() => auth.signOut()} className={styles.footerRow}><p className='blogText'>Sign Out with Google</p></div>
  )
}

function UserDisplay(props:any) {
  const { message, messagesRef } = props

  const messageClass = message.uid === auth.currentUser?.uid ? 'lightblue' : 'transparent'

  return (
    <>
        <div style={{display:'flex', flexDirection:'row', margin: '0.8rem', padding:'0.8rem', 
        justifyContent:'flex-start', alignItems:'flex-start', alignContent:'center',border:`0.02rem solid ${messageClass}`,borderRadius:'0.4rem'}}>
          <div style={{height: '2rem', width: '2rem', border: '1rem', overflow:'hidden', borderRadius: '1rem'}}>
          <Image
          src={`${message.photoURL}`}
          alt='Logged in User Image'
          quality={100}
          width={200}
          height={200}
          // sizes="0.2vw"
          />
          </div>
          <h3 className="blogText" style={{paddingLeft: '0.6rem'}}>{message.displayName}</h3>
          <p className="blogText" style={{paddingLeft: '1rem'}}>{message.text}</p>
          {/* <p className="blogText" style={{paddingLeft: '0.2rem'}}>{message.uid}</p> */}
        </div>
    </>
  )
}


export default function Comments({id}:{id:any}) {
  const messagesRef = collection(firestore, id)
  const firestoreQuery = query(messagesRef, orderBy('createdAt'),limit(20))
  const [messages] = useCollectionData(firestoreQuery)
  // signed in user is an object, signed out user is null
  const [user] = useAuthState(auth)

  useEffect(() => {
    console.log(messages)
  },[])

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e:any) => {
    e.preventDefault()
    if(user) {
      const { uid, photoURL, displayName } = user
      await addDoc(messagesRef,{
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
        displayName
      })
      setFormValue('');
    }
  }
    // const address = `https://randomuser.me/api/?results=${count}&seed=abcd`;
    // const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
    // const { data, error } = useSWR(address, fetcher);
  
    return (
      <div className={styles.cardBlog}>
        <div>
          {user ? (
            <>
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'flex-start',alignItems:'center', alignContent:'space-between', marginBottom:'2rem'}}>
                <div className="field">
                <input 
                value={formValue} 
                onChange={(e) => setFormValue(e.target.value)} 
                placeholder="say something nice" 
                />
                </div>
                <div style={{marginRight:'4rem'}}>
                <GoCheck size={30} onClick={sendMessage} fill="white" aria-label="Add new item"/>
                </div>
              <SignOut />
            </div>
            </>
          )
          : <SignIn />
        }
        {messages !== undefined && messages.map((msg => <UserDisplay message={msg} messagesRef={messagesRef} />))}
        </div>
      </div>
    );
  };