import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
      setCheckingStatus(false)
    })
  }, [])

  return { loggedIn, checkingStatus }
}
