import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Quiz from '../components/Quiz';
import defaultImg from '../assets/default_quiz.jpg';

describe('Quiz', () => {
  const quiz = {
    name: "New Quiz",
      owner: "a",
      questions: [
        {
          id: "shboivpl",
          title: "Hi",
          thumbnail: '',
          time: 30,
          points: 0,
          answers: [
            {
              id: "zvrbpon",
              text: "Hiiiii",
              correct: true
            },
            {
              id: "kaltflbx",
              text: "Byeeee",
              correct: false
            }
          ]
        },
      ],
      thumbnail: null,
      active: null,
      createdAt: "2022-04-15T08:36:41.278Z"
  }

  it('displays quiz name correctly', () => {
    const quizObj = shallow(<Quiz quiz={quiz} />);
    const name = quizObj.find('h3').first();
    expect(name.text()).toBe('New Quiz');
  })

  it('displays quiz owner', () => {
    const quizObj = shallow(<Quiz quiz={quiz} />);
    const name = quizObj.find('p').first();
    expect(name.text()).toBe('a');
  })

  it('displays thumbnail correctly', () => {
    const quizObj = shallow(<Quiz quiz={quiz} />);
    const thumbnail = quizObj.find('img').first();
    expect(thumbnail.props().style).toHaveProperty('backgroundImage', `url(${defaultImg})`)
  })

  it('can be clicked to start a game', () => {
    const setConfirm = jest.fn();
    const setStartQuiz= jest.fn();
    const quizObj = shallow(<Quiz quiz={quiz} setConfirm={setConfirm} setStartQuizId={setStartQuiz} />);
    const div = quizObj.find('div').first();
    div.simulate('click');
    expect(setConfirm).toHaveBeenCalledTimes(1);
    expect(setStartQuiz).toHaveBeenCalledTimes(1);
  })
})