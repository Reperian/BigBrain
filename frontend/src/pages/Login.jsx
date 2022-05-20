import LoginForm from '../components/LoginForm';
import React from 'react';
import loginDiv from '../css/authPage.module.css';

//  page to login
function Login () {
  return <>
    <div className={loginDiv.background}>
      <div className={loginDiv.authContainer}>
        <h1>Login</h1>
        <div className={loginDiv.Form}>
          <LoginForm />
        </div>
      </div>
    </div>
  </>
}

export default Login;
