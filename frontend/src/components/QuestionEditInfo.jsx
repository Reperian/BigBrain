import React from 'react';
import style from '../css/questionEdit.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import fileToDataUrl from './fileToDataUrl';
import PropTypes from 'prop-types';
import Answer from './Answer';
import {
  useNavigate,
} from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import QuestionEditSidebar from './QuestionEditSidebar';

//  allows users to edit a particular question within a quiz
function QuestionEditInfo (props) {
  const navigate = useNavigate();
  const [imgToggle, setImgToggle] = React.useState(true);
  const [questionName, setQuestionName] = React.useState(props.question.title);
  const [questionThumbnail, setQuestionThumbnail] = React.useState(props.question.thumbnail);
  const [answers, setAnswers] = React.useState(props.question.answers);
  const [points, setPoints] = React.useState(props.question.points);
  const [time, setTime] = React.useState(props.question.time);

  const thumbnailInput = {
    background: 'white',
    borderRadius: '4px',
    boxsShadow: 'rgb(0 0 0 / 15%) 0px 2px 4px 0px',
    margin: 'auto',
    marginTop: '0px',
    marginBottom: '0px',
    width: '40vw',
    height: '40vw',
    maxWidth: '500px',
    maxHeight: '500px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundImage: imgToggle ? `url(${questionThumbnail})` : '',
    backgroundSize: '100% 100%',
    objectFit: 'fill'
  }

  const changeThumbnail = async () => {
    const img = await fileToDataUrl(document.getElementById('newThumbnail').files[0]);
    setQuestionThumbnail(img);
    setImgToggle(true);
  }

  const addAnswers = () => {
    const answer = {
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8),
      text: '',
      correct: false
    }
    setAnswers([...answers, answer]);
  }

  const deleteThumbnail = () => {
    setQuestionThumbnail('');
    setImgToggle(false);
  }

  //  updates the question in database
  const updateQuestion = async () => {
    const questions = [...props.quiz.questions];
    //  updating information of question
    questions[props.index].answers = answers;
    questions[props.index].title = questionName;
    questions[props.index].thumbnail = questionThumbnail;
    questions[props.index].points = points;
    questions[props.index].time = time;

    const name = props.quiz.name;
    const thumbnail = props.quiz.thumbnail;

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
      //  navigates back to quizEdit.jsx
      navigate(`/dashboard/${props.quizId}/edit`);
    }
  }

  return (<>
    <div className={style.questionMain}>
      <div className={style.titleInput}>
        <TextField
          className="outlined-basic"
          size="large"
          fullWidth={true}
          variant="outlined"
          inputProps={{ style: { textAlign: 'center', fontWeight: 'bold', fontSize: '200%' } }}
          defaultValue={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
        />
      </div>

      <div style={thumbnailInput}>
        {
          imgToggle
            ? <Button
                className={style.deleteButton}
                variant="contained"
                color="error"
                onClick={deleteThumbnail}>
                <DeleteForeverIcon />
              </Button>
            : <div className={style.thumbnailButton}>
                <Button component='label' className={style.addThumbnail} variant="contained"><AddIcon fontSize='large'/> <input id='newThumbnail' type='file' hidden onChange={changeThumbnail}></input></Button>
                <p>Add a thumbnail to your question</p>
              </div>
        }
      </div>

      <div className={style.answerList}>
        {
          answers.map((answer, index) => {
            return (
              <Answer key={index} id={index} answer={answer} answers={answers} setAnswers={setAnswers} />
            )
          })
        }
        {answers.length < 6
          ? <Button
              className={style.addButton}
              variant="contained"
              color="primary"
              fullWidth="false"
              onClick={addAnswers}>
              Add more
            </Button>
          : ''
        }
      </div>
    </div>

    <QuestionEditSidebar points={points} setPoints={setPoints} time={time} setTime={setTime} updateQuestion={updateQuestion}/>
  </>)
}

QuestionEditInfo.propTypes = {
  question: PropTypes.object,
  quizId: PropTypes.number,
  quiz: PropTypes.object,
  index: PropTypes.number
};

export default QuestionEditInfo;
