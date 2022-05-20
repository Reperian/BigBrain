import React from 'react';
import style from '../css/quizPlay.module.css';
import PropTypes from 'prop-types';

//  displays as a correct or incorrect answer during question result
function AnswerCorrect (props) {
  const answer = {
    background: props.correct ? 'lightgreen' : 'white',
    borderRadius: '4px',
    width: '100%',
    height: '75px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    padding: '0 20px',
  }
  return (<>
    <label htmlFor={props.index} className={style.answerLabel}>
      <div style={answer}>
        <h2>{props.answer.text}</h2>
      </div>
    </label>
  </>)
}

AnswerCorrect.propTypes = {
  answers: PropTypes.array,
  index: PropTypes.number,
  setAnswers: PropTypes.func,
  answer: PropTypes.object,
  id: PropTypes.string,
  correct: PropTypes.bool,
};

export default AnswerCorrect
