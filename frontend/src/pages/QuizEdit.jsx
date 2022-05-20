import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import style from '../css/quizEdit.module.css';
import Button from '@mui/material/Button';

import QuizInfo from '../components/QuizInfo';
import QuizQuestions from '../components/QuizQuestions';
import defaultImg from '../assets/default_quiz.jpg';

//  page to edit quizzes
function QuizEdit () {
  const params = useParams();
  const [quiz, setQuiz] = React.useState('');
  const [questionList, setQuestions] = React.useState([]);
  const [id, setId] = React.useState(Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8));
  const [questionNum, setQuestionNum] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    getQuiz();
  }, []);

  React.useEffect(() => {
    getQuiz();
  }, [toggle]);

  const getQuiz = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      const data = await response.json();
      setQuiz(data);
      setQuestions(data.questions);
      setTime(0);
      calculateQuestions(data);
    }
  }

  const calculateQuestions = (quiz) => {
    setQuestionNum(quiz.questions.length);
    let counter = 0;
    quiz.questions.forEach((element) => {
      counter += element.time;
    })
    setTime(counter);
  }

  const questionObj = {
    id: id,
    title: 'New Question',
    thumbnail: defaultImg,
    time: 0,
    points: 0,
    answers: [
      {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8),
        text: '',
        correct: false
      },
      {
        id: Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8),
        text: '',
        correct: false
      }
    ]
  }

  const addQuestion = async () => {
    const questions = [...questionList];
    questions.push(questionObj);

    const thumbnail = quiz.thumbnail;
    const name = quiz.name;

    const response = await fetch(`http://localhost:5005/admin/quiz/${params.id}`, {
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
      setQuestions(questions);
      setToggle(!toggle);
      setId(Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 8));
    }
  }

  return (<>
  <div className={style.background}>
    <NavBar />
    <div className={style.container}>
      <div className={style.quizInfo}>
        <QuizInfo quiz={quiz} id={params.id} questionNum={questionNum} time={time}/>
      </div>
      <div className={style.quizQuestions}>
        <div className={style.questionHeader}>
          <Button
            className={style.createButton}
            variant="contained"
            color="success"
            fullWidth="false"
            onClick={addQuestion}>
            New Question
          </Button>
          <h2>Questions</h2>
        </div>
        {
          questionList.map((question, index) => {
            return (
              <QuizQuestions
                key={index}
                num={index}
                question={question}
                questionList={questionList}
                setQuestions={setQuestions}
                quizId={params.id}
                quiz={quiz}
              />
            )
          })
        }
      </div>
    </div>
  </div>
  </>)
}

export default QuizEdit;
