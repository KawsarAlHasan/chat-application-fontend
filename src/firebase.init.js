// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD22HmxeUwezBCf9z3PNTjKUT4z8SG2Ts4',
  authDomain: 'real-love-message.firebaseapp.com',
  projectId: 'real-love-message',
  storageBucket: 'real-love-message.appspot.com',
  messagingSenderId: '123263067125',
  appId: '1:123263067125:web:63be91cbae109dd986f6bc',
  measurementId: 'G-9LSZBZR3JQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
export default auth
