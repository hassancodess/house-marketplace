import { getAuth, updateEmail, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData

  const navigate = useNavigate()

  const onLogOut = () => {
    auth.signOut()
    navigate('/')
  }
  const onSumbit = () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update in Auth
        updateProfile(auth.currentUser, {
          displayName: name,
        })
        // Update in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        updateDoc(userRef, { name })
      }
      if (auth.currentUser.email !== email) {
        // Update Email in Auth
        updateEmail(auth.currentUser, email)
        // Update Email in Firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        updateDoc(userRef, { email })
      }
    } catch (error) {
      toast.error(error)
    }
  }
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <>
      <div className='profile'>
        <header className='profileHeader'>
          <p className='pageHeader'>My Profile</p>
          <button type='button' className='logOut' onClick={onLogOut}>
            Logout
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                changeDetails && onSumbit()
                setChangeDetails((prev) => !prev)
              }}
            >
              {changeDetails ? 'Done' : 'Change'}
            </p>
          </div>
          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={!changeDetails ? 'profileName' : 'profileNameActive'}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type='email'
                id='email'
                className={
                  !changeDetails ? 'profileEmail' : 'profileEmailActive'
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

export default Profile
