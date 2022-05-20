import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../assets/default_quiz.jpg';
import playIcon from '../assets/playIcon.png';
import Button from '@mui/material/Button';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import style from '../css/dashboard.module.css';

//  display of all quizzes made by a user
const Quiz = (props) => {
  React.useEffect(() => {
    getQuizInfo();
  }, []);

  const [img, setImg] = React.useState('');
  const [questionNum, setQuestionNum] = React.useState(0);
  const [time, setTime] = React.useState(0);

  const thumbnail = {
    width: '125px',
    backgroundImage: props.quiz.thumbnail ? ` url(${props.quiz.thumbnail})` : `url(${defaultImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    objectFit: 'fill'
  }

  const openEdit = () => {
    props.openEdit(props.quiz.id);
  }

  const deleteQuiz = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${props.quiz.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      //  updates state in Dashboard.jsx
      //  state change causes a render in quizList.jsx
      props.setValue(!props.value);
    }
  }

  const startAlert = () => {
    props.setConfirm(true);
    props.setStartQuizId(props.quiz.id);
  }
  //  calls another fetch to find question num and time to complete
  const getQuizInfo = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${props.quiz.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      const data = await response.json();
      calculateQuestions(data);
    }
  }

  const calculateQuestions = (quiz) => {
    console.log(quiz);
    setQuestionNum(quiz.questions.length);
    let counter = 0;
    quiz.questions.forEach((element) => {
      counter += element.time;
      console.log(element);
    })
    setTime(counter);
  }
  return <>
    <div className={style.quiz} name={'quiz' + props.id} onMouseEnter={() => setImg(playIcon)} onMouseLeave={() => setImg('')} onClick={() => startAlert()}>
        <img style={thumbnail} src={img}></img>

      <div className={style.quizInfoContainer}>
        <div className={style.quizTitle}>
          <h3>{props.quiz.name}</h3>
          <div className={style.buttons}>
            <Button
              name={'edit' + props.id}
              className={style.quizButton}
              variant="contained"
              color="primary"
              onClick={() => openEdit()}>
            <EditIcon /></Button>

            <Button
              name={'delete' + props.id}
              className={style.quizButton}
              variant="contained"
              color="error"
              onClick={() => deleteQuiz()}>
              <DeleteForeverIcon />
            </Button>
          </div>
        </div>

        <div className={style.quizInfo}>
          <p>{props.quiz.owner}</p>
          <p>Number of questions: {questionNum || 0} </p>
          <p>Time to complete: {time} seconds</p>
        </div>

      </div>

    </div>
  </>
}

Quiz.propTypes = {
  quiz: PropTypes.object,
  value: PropTypes.bool,
  setValue: PropTypes.func,
  setConfirm: PropTypes.func,
  setStartQuizId: PropTypes.func,
  openEdit: PropTypes.func,
  id: PropTypes.number,
};

export default Quiz;
