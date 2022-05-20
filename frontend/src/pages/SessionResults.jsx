import React from 'react';
import { useParams } from 'react-router-dom';
import style from '../css/quizPlay.module.css';

function SessionResults () {
  React.useEffect(() => {
    getResults();
  }, []);
  const params = useParams();
  const [results, setResults] = React.useState([]);
  const [correct, setCorrect] = React.useState([]);

  const getResults = async () => {
    const response = await fetch(`http://localhost:5005/admin/session/${params.sessionId}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })

    if (response.ok) {
      const data = await response.json();
      setResults(data.results);
      calculateStats();
    }
  }

  const calculateStats = () => {
    results.forEach((player) => {
      let correctNum = 0;
      player.answers.forEach((answer) => {
        if (answer.correct) {
          correctNum++;
        }
      })
      const newRecord = {
        name: player.name,
        correctNum: correctNum,
      }
      const newList = [...correct];
      newList.push(newRecord);
      setCorrect(newList);
    })
  }

  return (<>
    <div className={style.resultsBackground}>
      <div className={style.resultsContainer}>
        <h1>Player Results</h1>
        {
          correct
            ? correct.map((player, index) => {
              return (
                <div key={index} className={style.results}>
                  <h3>{player.name}</h3>
                  <h3 style={{ float: 'right' }}>{player.correctNum} questions correct</h3>
                </div>
              )
            })
            : ''
        }
      </div>
    </div>
  </>)
}

export default SessionResults
