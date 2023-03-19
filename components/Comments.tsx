import useSWR from "swr";
import axios from "axios";
import styles from '../styles/Home.module.css'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { collection, orderBy, limit, query, serverTimestamp, addDoc, setDoc } from 'firebase/firestore'
import Image from "next/image"
import { GoHubot, GoCheck } from "react-icons/go"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionDataOnce, useCollectionData } from 'react-firebase-hooks/firestore'
import { auth, firestore, analytics } from '../lib/firebase'
import { useEffect, useState } from "react";

function SignIn({auth}:{auth: any}) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }
  return (
    <div onClick={signInWithGoogle} className={styles.footerRow}><p className='blogText'>Sign in with Google</p></div>
  )
}

function SignOut({auth}:{auth: any}) {
  return auth.currentUser &&  (
    <div onClick={() => auth.signOut()} className={styles.footerRow}><p className='blogText'>Sign Out with Google</p></div>
  )
}

function UserDisplay(props:any) {
  const { message, messagesRef, auth } = props

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
  // signed in user is an object, signed out user is null
  const messagesRef = collection(firestore, id)
  const firestoreQuery = query(messagesRef, orderBy('createdAt'),limit(20))
  const [messages, loading] = useCollectionData(firestoreQuery)
  const [formValue, setFormValue] = useState('');
  const [user] = useAuthState(auth)

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
    if(messages == undefined) {
      return (
        <SignIn  auth={auth}/>
      )
    }

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
                <SignOut auth={auth}/>
              </div>
              </>
            )
            : <SignIn  auth={auth}/>
          }
          {messages.map((msg:any,index:number) => {
              // <UserDisplay key={index} message={msg} messagesRef={messagesRef} />
              <p>{JSON.stringify(msg)}</p>
            }
          )}
          </div>
        </div>
      );
  };