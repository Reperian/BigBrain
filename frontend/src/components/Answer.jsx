import React from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import style from '../css/questionEdit.module.css';
import PropTypes from 'prop-types';

//  an answer checkbox during question edit to choose answers for a question
function Answer (props) {
  const changeText = (e) => {
    const newList = [...props.answers];
    newList[props.id].text = e;
    props.setAnswers(newList);
  }

  const changeCorrect = (e) => {
    const newList = [...props.answers];
    newList[props.id].correct = e;
    props.setAnswers(newList);
  }

  return (<>
    <div className={style.answer}>
      <TextField
        className="outlined-basic"
        size="large"
        fullWidth={true}
        variant="standard"
        InputProps={{ disableUnderline: true, style: { fontWeight: 'bold', fontSize: '100%' } }}
        placeholder="New Answer"
        defaultValue={props.answer.text}
        onChange={e => changeText(e.target.value)}
      />
      {
        props.answer.correct
          ? <Checkbox onChange={e => changeCorrect(e.target.checked)} defaultChecked/>
          : <Checkbox onChange={e => changeCorrect(e.target.checked)}/>
      }
    </div>
  </>)
}

Answer.propTypes = {
  answers: PropTypes.array,
  id: PropTypes.number,
  setAnswers: PropTypes.func,
  answer: PropTypes.object
};

export default Answer
