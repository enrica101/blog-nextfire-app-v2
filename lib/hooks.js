 import { auth, firestore } from '../lib/firebase';
// to hook the context to the live firebase data
// import { useEffect, useState } from 'react'
import { useState, useEffect } from 'react';

// [useAuthState()] Provides an easy way to listen to the current user in firebase.
import { useAuthState } from 'react-firebase-hooks/auth'

 export default function useUserData() {
    // grabs the current user from the firebase
  const [user] = useAuthState(auth)

  //initialize state for a username using useState hook
  //The username will have an initial value of null
  const [username, setUsername] = useState(null)

  // [useEffect] hook will listen to any changes to the user object
  // when the user object changes, we can fetch a new user document from the firestore database
  useEffect(() => {
    // turn off realtime subscription when it is no longer needed (by means that the previous user is no longer signed in. )
    let unsubscribe;

    //if useAuthState has a user
    if( user ){
      // then make a reference in the "users" colletion with the document that matches that user's [from useAuthState] uid [from document]
      const ref = firestore.collection('users').doc(user.uid)

      // when [ref.onSnapshot] is called, firebase returns a function that when called will unsubscribe from that data. 
      // on Snapshot itself takes a callback function that will provide you with the latest document information from the database
      // whenever the document updates run with the latest data.  
      unsubscribe = ref.onSnapshot((doc) => {
        // when we get that data, we go ahead set the username on the component with the latest data
        setUsername(doc.data()?.username)
      })
    } else {
      setUsername(null)
    }

    return unsubscribe
  }, [user])

    return {user, username}
 }