import React from 'react';
import style from '../css/quizPlay.module.css';

function PlayerResults () {
  React.useEffect(() => {
    getResults();
  }, []);

  const [results, setResults] = React.useState('');

  const getResults = async () => {
    const response = await fetch(`http://localhost:5005/play/${localStorage.getItem('playerId')}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json();
      setResults(data);
    }
  }

  return (<>
    <div className={style.resultsBackground}>
      <div className={style.resultsContainer}>
        <h1>Results</h1>
        {
          results
            ? results.map((result, index) => {
              return (
                <div key={index} className={style.results}>
                  <h3 key={index} className={style.result}>Question {index + 1}</h3>
                  <h3 style={{ color: result.correct ? 'green' : 'red', float: 'right' }}>{result.correct ? 'correct' : 'incorrect'}</h3>
                </div>
              )
            })
            : ''
        }
      </div>
    </div>
  </>)
}

export default PlayerResults;
