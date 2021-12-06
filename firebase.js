// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB4pHTKr8jBYl5qjC2f1Yj8PpaS7zEHkrk',
  authDomain: 'insta-redesign-dec9d.firebaseapp.com',
  projectId: 'insta-redesign-dec9d',
  storageBucket: 'insta-redesign-dec9d.appspot.com',
  messagingSenderId: '175414734065',
  appId: '1:175414734065:web:6eeb09effa567f4e340d50',
}

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
