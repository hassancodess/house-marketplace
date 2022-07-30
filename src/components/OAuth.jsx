import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new  GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      //   Check user in Firestore
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      //   If user doesn't exists in Firestore
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with Google Auth')
    }
  }

  return (
    <div className='socialLogin'>
      <p>Sign {location.pathname === '/sign-in' ? 'Up' : 'In'}</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img src={googleIcon} alt='google' className='socialIconImg' />
      </button>
    </div>
  )
}

export default OAuth
