import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import React from 'react';
import './App.css';
import style from './css/navbar.module.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuizEdit from './pages/QuizEdit';
import QuestionEdit from './pages/QuestionEdit'
import QuizJoin from './pages/QuizJoin';
import QuizPlay from './pages/QuizPlay';
import SessionResults from './pages/SessionResults';

function App () {
  localStorage.setItem('questionId', 1);
  return (
    <>
      <BrowserRouter>
      <div className={style.popup} id="popup"></div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id/edit" element={<QuizEdit />} />
          <Route path='/dashboard/:quizId/:questionId/edit' element={<QuestionEdit />} />
          <Route path='/session/:sessionId/join' element={<QuizJoin />} />
          <Route path='/session/:sessionId/play' element={<QuizPlay />} />
          <Route path='/session/:sessionId/results' element={<SessionResults />} />
        </Routes>
      </BrowserRouter>,
    </>
  );
}

export default App;
