import React from 'react';
import style from '../css/quizPlay.module.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import BigBrain from '../assets/logo_text.png';

//  page where users can join a quiz with a session id
function QuizJoin () {
  const params = useParams();
  const [gameId, setGameId] = React.useState(params.sessionId);
  const [name, setName] = React.useState('BigBrainer');
  const navigate = useNavigate();

  const joinGame = async () => {
    const response = await fetch(`http://localhost:5005/play/join/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name
      })
    })

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('playerId', data.playerId);
      localStorage.setItem('sessionId', gameId);
      localStorage.removeItem('finished');
      navigate(`/session/${gameId}/play`);
    }
  }

  return (<>
    <div className={style.background}>
      <img className={style.logoText} src={BigBrain} />
      <div className={style.joinContainer}>
        <TextField
          id='sessionId'
          variant="outlined"
          fullWidth={true}
          defaultValue={params.sessionId}
          InputProps={{
            startAdornment: <InputAdornment position="start">Game ID</InputAdornment>,
          }}
          onChange={(e) => setGameId(e.target.value)}
        />
        <TextField
          id='sessionId'
          variant="outlined"
          fullWidth={true}
          InputProps={{
            startAdornment: <InputAdornment position="start">Display Name</InputAdornment>,
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
        className={style.joinButton}
        variant="contained"
        color="success"
        fullWidth={true}
        onClick={() => joinGame()}>
        Join
      </Button>
      </div>
    </div>
  </>)
}

export default QuizJoin
