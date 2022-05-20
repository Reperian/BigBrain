import React from 'react';
import style from '../css/questionEdit.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import PropTypes from 'prop-types';

//  side section for the question edit page, allows users to edit points and time for a question
function QuestionEditSidebar (props) {
  return (<>
    <div className={style.otherInput}>
      <div>
        <p>Points for this question:</p>
        <TextField
          type='number'
          variant='outlined'
          size='small'
          InputProps={{
            endAdornment: <InputAdornment position="end">points</InputAdornment>,
          }}
          defaultValue={props.points}
          onChange={(e) => props.setPoints(e.target.valueAsNumber)}>
        </TextField>
        <p>Time Allowed for this question:</p>
        <TextField
          type='number'
          variant='outlined'
          size='small'
          InputProps={{
            endAdornment: <InputAdornment position="end">secs</InputAdornment>,
          }}
          defaultValue={props.time}
          onChange={(e) => props.setTime(e.target.valueAsNumber)}>
        </TextField>
      </div>
      <Button
        className={style.saveButton}
        variant="contained"
        color="success"
        fullWidth="false"
        onClick={props.updateQuestion}>
        Save
      </Button>
    </div>
  </>)
}

QuestionEditSidebar.propTypes = {
  updateQuestion: PropTypes.func,
  setPoints: PropTypes.func,
  points: PropTypes.number,
  setTime: PropTypes.func,
  time: PropTypes.number
};

export default QuestionEditSidebar;
