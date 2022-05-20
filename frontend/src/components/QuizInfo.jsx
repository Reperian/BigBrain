import React from 'react';
import defaultImg from '../assets/default_quiz.jpg';
import PropTypes from 'prop-types';
import style from '../css/quizEdit.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { showPopup } from './Popups';
import fileToDataUrl from './fileToDataUrl';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

//  information of a quiz in quizEdit, allows users to change thumbnail and name
function QuizInfo (props) {
  const [imgToggle, setImgToggle] = React.useState(false);
  const [nameToggle, setNameToggle] = React.useState(false);
  const [newName, setNewName] = React.useState('');

  const thumbnailPic = {
    width: '340px',
    height: '340px',
    alignSelf: 'center',
    backgroundImage: props.quiz.thumbnail ? `url(${props.quiz.thumbnail})` : `url(${defaultImg})`,
    opacity: imgToggle ? 0.5 : 1,
    backgroundRepeat: 'no-repeat',
    boxShadow: 'rgb(0 0 0 / 15%) 0px 2px 4px 0px',
    cursor: 'pointer',
    backgroundSize: '100% 100%',
    objectFit: 'fill'
  }

  const changeThumbnail = async () => {
    const img = document.getElementById('newThumbnail').files[0];
    const thumbnail = await fileToDataUrl(img);
    const name = props.quiz.name;
    const questions = props.quiz.questions;
    const response = await fetch(`http://localhost:5005/admin/quiz/${props.id}`, {
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
      props.quiz.thumbnail = thumbnail;
      setImgToggle(false);
      showPopup('Successfully changed quiz thumbnail', true);
    }
  }

  const changeName = async () => {
    if (nameToggle) {
      const thumbnail = props.quiz.thumbnail;
      const questions = props.quiz.questions;
      const name = newName;
      const response = await fetch(`http://localhost:5005/admin/quiz/${props.id}`, {
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
        props.quiz.name = name;
      }
    }

    setNameToggle(!nameToggle);
  }

  return (
    <>
      <div
        style={thumbnailPic}
        onMouseEnter={() => setImgToggle(true)}
        onMouseLeave={() => setImgToggle(false)}>
        {imgToggle
          ? <div>
              <EditIcon sx={{ fontSize: 50 }}/>
              <input id='newThumbnail' className={style.fileInput} type='file' onChange={changeThumbnail}></input>
            </div>
          : ''}
      </div>

      <div className={style.quizText}>
        <div className={style.quizName}>
        {nameToggle
          ? <TextField
              name='editName'
              className="outlined-basic"
              size="small"
              fullWidth="true"
              variant="outlined"
              onChange={e => setNewName(e.target.value)}
              defaultValue={props.quiz.name}
            />
          : <h2>{props.quiz.name}</h2>
        }
         <Button name='editNameButton' onClick={() => changeName()}>{nameToggle ? 'save' : <EditIcon fontSize='large'/>}</Button>
        </div>
        <p>Created by: {props.quiz.owner}</p>
        <p>Number of questions: {props.questionNum || 0}</p>
        <p>Time to complete: {props.time} seconds</p>
      </div>
    </>
  )
}

QuizInfo.propTypes = {
  quiz: PropTypes.object,
  id: PropTypes.string,
  questionNum: PropTypes.number,
  time: PropTypes.number,
};

export default QuizInfo;
