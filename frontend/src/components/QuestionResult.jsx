import React from 'react';
import style from '../css/quizPlay.module.css';
import PropTypes from 'prop-types';
import AnswerCorrect from './AnswerCorrect';

//  displays the results of a question
function QuestionResult (props) {
  React.useEffect(() => {
    getAnswers();
  }, []);

  const [correctAnswers, setCorrectAnswers] = React.useState('');

  const getAnswers = async () => {
    const response = await fetch(`http://localhost:5005/play/${localStorage.getItem('playerId')}/answer`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCorrectAnswers(data.answerIds);
    }
  }

  return (<>
    <div className={style.question}>
      {
        props.question ? <h1>{props.question.title}</h1> : <h1>Waiting for Question...</h1>
      }
    </div>
    {
      props.question ? <img className={style.questionPic} src={props.question.thumbnail} /> : ''
    }
    {
      props.question.answers
        ? props.question.answers.map((answer, index) => {
          let correct = false;
          if (correctAnswers.includes(answer.id)) {
            correct = true;
          } else {
            correct = false;
          }
          return (
            <AnswerCorrect key={index} index={index} answer={answer} id={answer.id} correct={correct}/>
          )
        })
        : ''
    }
  </>)
}

QuestionResult.propTypes = {
  question: PropTypes.object,
  thumbnail: PropTypes.string,
  answers: PropTypes.array,
  playerAnswers: PropTypes.array,
  setPlayerAnswers: PropTypes.func,
  timer: PropTypes.number,
  status: PropTypes.object,
};

export default QuestionResult
