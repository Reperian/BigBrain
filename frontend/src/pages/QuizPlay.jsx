import React from 'react';
import QuestionPlay from '../components/QuestionPlay';
import QuestionResult from '../components/QuestionResult';
import PlayerResults from '../components/PlayerResults';
import style from '../css/quizPlay.module.css';

//  page where the game is played
function QuizPlay () {
  const [question, setQuestion] = React.useState('');
  const [timer, setTimer] = React.useState(0);
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      getQuestion();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getQuestion = async () => {
    const response = await fetch(`http://localhost:5005/play/${localStorage.getItem('playerId')}/question`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json();
      setQuestion(data.question);
      setTimer(data.question.time);
      const temp = localStorage.getItem('finished');
      setFinished(temp);
    } else {
      setQuestion('');
      const temp = localStorage.getItem('finished');
      setFinished(temp);
    }
  }
  return (<>
    <div className={style.gameBackground}>
      {
        finished
          ? <PlayerResults />
          : <span></span>
      }
      {
        localStorage.getItem('answerAvailable') ? <QuestionResult question={question} finished={finished}/> : <QuestionPlay question={question} timer={timer} finished={finished} />
      }
    </div>
  </>)
}

export default QuizPlay
