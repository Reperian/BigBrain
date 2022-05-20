import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../css/navbar.module.css';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
//  navbar on top of pages
function NavBar () {
  const navigate = useNavigate();

  const signOut = async () => {
    const response = await fetch('http://localhost:5005/admin/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      localStorage.removeItem('token');
      //  signs the user out and navigates to login page
      navigate('/login');
    }
  }

  const home = () => {
    //  navigates to dashboard
    navigate('/dashboard');
  }

  return <>
    <nav className={style.nav}>
      <img className={style.logo} src={require('../assets/logo.png')} onClick={home}></img>
      <Button
        name='signout'
        className={style.signout}
        variant="contained"
        color="error"
        startIcon={<LogoutOutlinedIcon />}
        onClick={signOut}>
        Sign Out
      </Button>
    </nav>
  </>
}

export default NavBar;
