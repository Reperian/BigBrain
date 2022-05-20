import React from 'react';
import style from '../css/dashboard.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

//  shows when user starts a game, provides a link and allows user to advance game or end game
function StartAlert (props) {
  const link = `localhost:3000/session/${props.sessionId}/join`
  const [buttonText, setButtonText] = React.useState('Start Game');
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      localStorage.setItem('counter', parseInt(localStorage.getItem('counter')) + 1);
      getStatus();
    }, 1000);
    return () => clearInterval(interval);
  }, [toggle]);

  const advanceGame = async () => {
    setButtonText('Next Question');
    const response = await fetch(`http://localhost:5005/admin/quiz/${props.quizId}/advance`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    if (response.ok) {
      localStorage.removeItem('finished');
      localStorage.setItem('counter', 0);
      setToggle(!toggle);
    } else {
      props.setConfirm(false);
      localStorage.setItem('finished', true);
    }
  }

  const getStatus = async () => {
    const response2 = await fetch(`http://localhost:5005/admin/session/${localStorage.getItem('sessionId')}/status`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response2.ok) {
      const data = await response2.json();
      data.results.answerAvailable ? localStorage.setItem('answerAvailable', false) : localStorage.removeItem('answerAvailable');
    }
  }

  return (
    <>
      <div className={style.blur}>
        <div className={style.alertContainer}>
          <h2>Your session link is:</h2>
          <div className={style.link}>
            <TextField
              id='sessionId'
              variant="outlined"
              fullWidth={true}
              InputProps={{
                readOnly: true,
              }}
              defaultValue={link}
            />
            <Button variant="text" onClick={() => navigator.clipboard.writeText(document.getElementById('sessionId').value)}>Copy</Button>
          </div>
          <div className={style.endStartButtons}>
            <Button className={style.endButton} name='endButton' variant="contained" color="error" onClick={() => props.setConfirm(false)}>End Game</Button>
            <Button className={style.endButton} variant="contained" color="success" onClick={() => advanceGame()}>{buttonText}</Button>
          </div>
        </div>
      </div>
    </>
  )
}

StartAlert.propTypes = {
  setConfirm: PropTypes.func,
  sessionId: PropTypes.number,
  quizId: PropTypes.string,
};

export default StartAlert
