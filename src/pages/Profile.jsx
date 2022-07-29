import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Profile() {
  const auth = getAuth()
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

  return (
    <>
      <div className='profile'>
        <div className='profileHeader'>
          <p className='pageHeader'>My Profile</p>
          <button type='button' className='logOut' onClick={onLogOut}>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Profile
