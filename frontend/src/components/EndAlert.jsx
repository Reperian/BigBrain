import React from 'react';
import style from '../css/dashboard.module.css';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

//  prompts users to view results
function EndAlert (props) {
  return (
    <>
      <div className={style.blur}>
        <div className={style.alertContainer}>
          <h2>Would you like to view results?</h2>
          <div className={style.viewResultButtons}>
            <Button className={style.endButton} variant="outlined" color="primary" onClick={() => props.endGame()}>no</Button>
            <Button className={style.endButton} name='yes' variant="contained" color="primary" onClick={() => props.getResults()}>yes</Button>
          </div>
        </div>
      </div>
    </>
  )
}

EndAlert.propTypes = {
  endGame: PropTypes.func,
  getResults: PropTypes.func,
};

export default EndAlert
