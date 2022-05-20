import React from 'react';
import style from '../css/quizPlay.module.css';
import AnswerPlay from '../components/AnswerPlay';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

//  displays a question during the game
function QuestionPlay (props) {
  const [playerAnswers, setPlayerAnswers] = React.useState('');
  const [disabled, setDisabled] = React.useState(false);

  //  users submit their answers
  const submitAnswers = async () => {
    await fetch(`http://localhost:5005/play/${localStorage.getItem('playerId')}/answer`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        answerIds: playerAnswers
      })
    })
    const newList = [];
    setPlayerAnswers(newList);
    setDisabled(true);
  }

  return (<>
    <div className={style.question}>
      {
        props.question ? <h1>{props.question.title}</h1> : <h1>Waiting for Question...</h1>
      }
    </div>
    {
      props.question
        ? <div className={style.timer}>
            <h1>{props.timer - parseInt(localStorage.getItem('counter'))}</h1>
          </div>
        : ''
    }
    {
      props.question ? <img className={style.questionPic} src={props.question.thumbnail} /> : ''
    }
    {
      props.question
        ? props.question.answers.map((answer, index) => {
          return (
            <AnswerPlay key={index} index={index} answer={answer} id={answer.id} answers={playerAnswers} setAnswers={setPlayerAnswers} disabled={disabled}/>
          )
        })
        : ''
    }
    {
      props.question && !disabled
        ? <Button
            className={style.submitButton}
            variant="contained"
            color="success"
            onClick={() => submitAnswers()}>
            Submit Answers
          </Button>
        : ''
    }
  </>)
}

QuestionPlay.propTypes = {
  question: PropTypes.object,
  thumbnail: PropTypes.string,
  answers: PropTypes.array,
  playerAnswers: PropTypes.array,
  setPlayerAnswers: PropTypes.func,
  timer: PropTypes.number,
  status: PropTypes.object,
  setTimer: PropTypes.func,
};

export default QuestionPlay
