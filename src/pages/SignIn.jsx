import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form>
          <input
            type='text'
            placeholder='Email'
            className='emailInput'
            id='email'
            value={email}
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              className='passwordInput'
              id='password'
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              className='showPassword'
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon width='34px' height='34px' fill='#ffffff' />
            </button>
          </div>
        </form>
        {/* Google OAuth */}
        <Link to='/sign-up' className='registerLink'>
          Sign Up Instead
        </Link>
      </div>
    </>
  )
}

export default SignIn
