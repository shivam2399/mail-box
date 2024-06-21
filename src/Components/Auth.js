import React, { useRef, useState } from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';


const Auth = () => {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const confirmPasswordInputRef = useRef()

  
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current?.value;
    
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
        setError('Passwords do not match');
        return;
      }

    setIsLoading(true);
    setError('')

    let url;
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAk_BR7zNI39A2hxUcmxMKbEm2oYRU1MkE'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAk_BR7zNI39A2hxUcmxMKbEm2oYRU1MkE'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then((res) => {
    setIsLoading(false);
    if(res.ok) {
      return res.json();
    } else {
      return res.json().then((data) => {
        let errorMessage = 'Authentication failed';
        if(data && data.error && data.error.message) {
          errorMessage = data.error.message
        }
        throw new Error(errorMessage)
      })
    }
  })
  .then((data) => {
    console.log("User successfully logged in")
  })
  .catch((err) => {
    alert(err.message)
  })
  };
    
  return (
    <>
      <nav>
        <div>
          <h1>Mail Box Client</h1>
          <Link to="/">Home</Link>
          <Link to="/">About Us</Link>
          <Link to="/">Products</Link>
        </div>
      </nav>
      <div className="container">
        <div className="form-container">
          <form onSubmit={submitHandler}>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' required ref={emailInputRef} />
            <label htmlFor='password'>Password</label>
            <input type="password" id='password' required ref={passwordInputRef} />
            {!isLogin && (
              <>
                <label htmlFor='confirm-password'>Confirm Password</label>
                <input type="password" id='confirm-password' required ref={confirmPasswordInputRef} />
              </>
            )}
            {error && <p>{error}</p>}
            <div>
              {!isLoading && <button>{isLogin ? 'Login' : 'Signup'}</button>}
              {isLoading && <p>Loading...</p>}
            </div>
            <div>
              <button type='button' className="switch-mode" onClick={switchAuthModeHandler}>
                {isLogin ? 'Create new account' : 'Have an account? Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth