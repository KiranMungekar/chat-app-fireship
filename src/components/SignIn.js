import React from 'react'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';





const SignIn = ()=>{
    const auth= firebase.auth();

    const signInWithGoogle=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return(
        <div>
            <button onClick={signInWithGoogle}> Sign in  with Google </button>
        </div>
    )
}

export default SignIn;