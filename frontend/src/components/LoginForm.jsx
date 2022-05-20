import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { showPopup } from './Popups';

import style from '../css/authPage.module.css';

import {
  useNavigate,
  Link,
} from 'react-router-dom';

//  allows users to log in
function LoginForm () {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async () => {
    const response = await fetch('http://localhost:5005/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    })

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      //  navigates to dashboard when logged in
      navigate('/dashboard');
    } else {
      response.json().then(response => {
        showPopup(response.error, false);
      })
    }
  }

  return (<>
    <p>Email</p>
    <TextField
      name='email'
      className="outlined-basic"
      size="small"
      fullWidth="true"
      variant="outlined"
      onChange={e => setEmail(e.target.value)}
      />

    <p>Password</p>
    <TextField
      name='password'
      type="password"
      className="outlined-basic"
      size="small"
      fullWidth="true"
      variant="outlined"
      onChange={e => setPassword(e.target.value)}
      />

    <Button
      name='login'
      className={style.button}
      variant="contained"
      fullWidth="true"
      color="success"
      onClick={login}>
      Log In
    </Button>

    <p>Don&apos;t have an account? <Link to='/register'>Sign up!</Link></p>
  </>)
}

export default LoginForm;
