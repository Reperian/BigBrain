import React from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import CreateQuiz from '../components/CreateQuiz';
import QuizList from '../components/QuizList';

import style from '../css/dashboard.module.css';
import StartAlert from '../components/StartAlert';
import EndAlert from '../components/EndAlert';

//  allows users to see all quizzes as well as play, add, modify or delete them.
function Dashboard () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [createdQuiz, setCreatedQuiz] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [startQuizId, setStartQuizId] = React.useState('');
  const [sessionId, setSessionId] = React.useState('');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  });

  React.useEffect(() => {
    if (confirm) {
      startGame();
    }
  }, [confirm]);

  const startGame = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${startQuizId}/start`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (!response.ok) {
      setConfirm(false);
      endGame();
    }

    const response2 = await fetch(`http://localhost:5005/admin/quiz/${startQuizId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response2.ok) {
      const data = await response2.json();
      console.log(data.active);
      setSessionId(data.active);
    }
  }

  const endGame = async () => {
    await fetch(`http://localhost:5005/admin/quiz/${startQuizId}/end`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    localStorage.setItem('finished', true);
    setSessionId('');
  }

  const getResults = async () => {
    await fetch(`http://localhost:5005/admin/quiz/${startQuizId}/end`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    const response = await fetch(`http://localhost:5005/admin/session/${sessionId}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      localStorage.setItem('finished', true);
      navigate(`/session/${sessionId}/results`);
      setSessionId('');
    }
  }

  return <>
    {
      confirm && sessionId ? <StartAlert setConfirm={setConfirm} sessionId={sessionId} quizId={startQuizId} /> : ''
    }
    {
      !confirm && sessionId ? <EndAlert endGame={endGame} getResults={getResults}/> : ''
    }
    <div className={style.background}>
      <NavBar />
      <div className={style.feedContainer}>
        <CreateQuiz value={createdQuiz} setValue={setCreatedQuiz}/>
        <QuizList value={createdQuiz} setValue={setCreatedQuiz} setConfirm={setConfirm} setStartQuizId={setStartQuizId}/>
      </div>
    </div>
  </>
}

export default Dashboard;
