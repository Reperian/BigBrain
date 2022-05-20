import React from 'react';
import { useParams } from 'react-router-dom';
import style from '../css/questionEdit.module.css';
import NavBar from '../components/NavBar';
import QuestionEditInfo from '../components/QuestionEditInfo';

//  page to edit questions
function QuestionEdit () {
  const params = useParams();
  const [question, setQuestion] = React.useState('');
  const [quiz, setQuiz] = React.useState('');
  const [questionIndex, setQuestionIndex] = React.useState(0);

  React.useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${params.quizId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      const data = await response.json();
      setQuiz(data);
      const q = data.questions.find((e) => {
        return e.id.toString() === params.questionId.toString();
      })
      const index = data.questions.findIndex((e) => {
        return e.id.toString() === params.questionId.toString();
      })
      setQuestionIndex(index);
      setQuestion(q);
    }
  }

  return (<>
    <div className={style.background}>
      <NavBar />
      {
        question ? <QuestionEditInfo question={question} quizId={params.quizId} quiz={quiz} index={questionIndex}/> : ''
      }
    </div>
  </>)
}

export default QuestionEdit;
