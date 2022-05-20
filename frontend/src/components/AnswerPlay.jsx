import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import style from '../css/quizPlay.module.css';
import PropTypes from 'prop-types';

//  displays as an answer during a game
function AnswerPlay (props) {
  const changeCorrect = (e) => {
    let newList = [...props.answers];
    if (e) {
      newList.push(props.id);
    } else {
      newList = props.answers.filter((e) => { return e !== props.id });
    }
    console.log(newList);
    props.setAnswers(newList);
  }

  return (<>
    <label htmlFor={props.index} className={style.answerLabel}>
      <div className={style.answerDiv}>
        <h2>{props.answer.text}</h2>
        {
          props.disabled
            ? <Checkbox id={props.index} disabled/>
            : <Checkbox id={props.index} onChange={e => changeCorrect(e.target.checked)}/>
        }
      </div>
    </label>
  </>)
}

AnswerPlay.propTypes = {
  answers: PropTypes.array,
  index: PropTypes.number,
  setAnswers: PropTypes.func,
  answer: PropTypes.object,
  id: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AnswerPlay
