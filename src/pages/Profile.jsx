import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Profile() {
  const [user, setUser] = useState(null)
  const auth = getAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (auth.currentUser) {
      console.log(auth.currentUser)
      setUser(auth.currentUser)
    } else {
      navigate('/')
    }
  }, [])

  return user ? <h1>{user.displayName}</h1> : <h1>No Profile Logged in</h1>
}

export default Profile
