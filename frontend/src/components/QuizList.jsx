import React from 'react';
import {
  useNavigate,
} from 'react-router-dom';

import Quiz from './Quiz';

import style from '../css/dashboard.module.css';

//  container in dashboard to fill up with quiz objects
function QuizList (prop) {
  const [quizzes, setQuizzes] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getQuizzes();
  }, [prop.value]);

  //  navigates to QuizEdit.jsx
  const openEdit = (quizId) => {
    navigate(`${quizId}/edit`);
  }

  const getQuizzes = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      const data = await response.json();
      setQuizzes(data.quizzes);
    }
  }

  return (
    <div className={style.quizContainer}>
      <h2>Quizzes</h2>
      {
        quizzes.map((quiz, index) => {
          return (
            <Quiz key={index} quiz={quiz} id={index} openEdit={openEdit} value={prop.value} setValue={prop.setValue} setConfirm={prop.setConfirm} setStartQuizId={prop.setStartQuizId}/>
          )
        })
      }
    </div>
  )
}

export default QuizList;
