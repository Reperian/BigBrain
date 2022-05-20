import RegisterForm from '../components/RegisterForm';
import React from 'react';
import registerDiv from '../css/authPage.module.css';

//  page where users register an account
function Register () {
  return <>
    <div className={registerDiv.background}>
      <div className={registerDiv.authContainer}>
        <h1>Register</h1>
        <div className={registerDiv.Form}>
          <RegisterForm />
        </div>
      </div>
    </div>
</>
}

export default Register;
