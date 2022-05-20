import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { showPopup } from './Popups';

import style from '../css/dashboard.module.css';

//  create quiz function in dashboard
function CreateQuiz (props) {
  const [quizName, setQuizName] = React.useState();

  const addQuiz = async () => {
    const name = quizName || 'New Quiz';
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name
      })
    })

    if (response.ok) {
      showPopup('Successfully created a quiz', true);
      props.setValue(!props.value);
    }
  }

  return (
    <div className={style.quizContainer}>
      <h2>Create a quiz!</h2>
      <div className={style.flex}>
        <TextField
          className={style.textbox}
          size="small"
          fullWidth="true"
          variant="outlined"
          label="Quiz name"
          onChange={e => setQuizName(e.target.value)}
        />

        <Button
          name='createQuiz'
          className={style.button}
          variant="contained"
          color="success"
          onClick={addQuiz}>
          Create
        </Button>
      </div>
    </div>
  )
}

CreateQuiz.propTypes = {
  value: PropTypes.bool,
  setValue: PropTypes.function
};

export default CreateQuiz;
