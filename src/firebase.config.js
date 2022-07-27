// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA4axJX1IOQD2LU06VsES1AHonho0VdZSE',
  authDomain: 'house-marketplace-app-4ab78.firebaseapp.com',
  projectId: 'house-marketplace-app-4ab78',
  storageBucket: 'house-marketplace-app-4ab78.appspot.com',
  messagingSenderId: '878223790735',
  appId: '1:878223790735:web:dd0438a10704215b7f16fa',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
