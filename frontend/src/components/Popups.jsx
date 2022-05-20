import React from 'react';
import Alert from '@mui/material/Alert';
import * as ReactDOM from 'react-dom';

import style from '../css/authPage.module.css';

//  displays an error or success alert
const showPopup = (error, success) => {
  if (success) {
    ReactDOM.render(<Success message={error}/>, document.getElementById('popup'));
  } else {
    ReactDOM.render(<Error message={error}/>, document.getElementById('popup'));
  }
}

function Error (error) {
  return <>
    <Alert
      className={style.error}
      variant="filled"
      severity="error"
      onClose={() => { ReactDOM.unmountComponentAtNode(document.getElementById('popup')); }}>
    {error.message}
    </Alert>
  </>
}

function Success (error) {
  return <>
    <Alert
      className={style.error}
      variant="filled"
      severity="success"
      onClose={() => { ReactDOM.unmountComponentAtNode(document.getElementById('popup')); }}>
    {error.message}
    </Alert>
  </>
}

export { showPopup };
