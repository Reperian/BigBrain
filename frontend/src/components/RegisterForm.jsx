import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { showPopup } from './Popups';
import {
  useNavigate,
  Link,
} from 'react-router-dom';

import style from '../css/authPage.module.css';

//  allows users to register an account
function RegisterForm () {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const register = async () => {
    const response = await fetch('http://localhost:5005/admin/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      })
    })

    if (response.ok) {
      showPopup('Successfully registered', true);
      //  navigates to login when registered
      navigate('/login');
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

      <p>Name</p>
      <TextField
        name='name'
        className="outlined-basic"
        size="small"
        fullWidth="true"
        variant="outlined"
        onChange={e => setName(e.target.value)}
        />

      <Button
        name='register'
        className={style.button}
        variant="contained"
        fullWidth="true"
        color="success"
        onClick={register}>
        Sign up
      </Button>
      <p>Already have an account? <Link to='/login'>Log In!</Link></p>
  </>)
}

export default RegisterForm;
