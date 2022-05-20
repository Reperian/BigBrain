import React from 'react';
import style from '../css/quizEdit.module.css';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

//  shows all question of a quiz in quizEdit, allows users to add, modify or delete questions
function QuizQuestions (props) {
  const navigate = useNavigate();

  const thumbnail = {
    minWidth: '150px',
    minHeight: '150px',
    backgroundImage: `url(${props.question.thumbnail})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    objectFit: 'fill'
  }

  const deleteQuestion = async () => {
    const name = props.quiz.name;
    const thumbnail = props.quiz.thumbnail;
    const questions = props.questionList.filter(e => { return e.id !== props.question.id })
    const response = await fetch(`http://localhost:5005/admin/quiz/${props.quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        questions,
        name,
        thumbnail
      })
    })

    if (response.ok) {
      props.setQuestions(questions);
    }
  }

  return (<>
    <div className={style.questionContainer}>
      {/* navigates to question edit */}
      <div className={style.questionText} onClick={() => navigate(`/dashboard/${props.quizId}/${props.question.id}/edit`)}>
        <p>Question {props.num + 1}</p>
        <h2>{props.question.title}</h2>
      </div>
      <div style={thumbnail}>
        <Button
          className={style.deleteButton}
          variant="contained"
          color="error"
          onClick={deleteQuestion}>
          <DeleteForeverIcon />
        </Button>
      </div>
    </div>
  </>)
}

QuizQuestions.propTypes = {
  key: PropTypes.number,
  question: PropTypes.object,
  num: PropTypes.number,
  questionList: PropTypes.array,
  setQuestions: PropTypes.function,
  quizId: PropTypes.number,
  quiz: PropTypes.object
};

export default QuizQuestions;
