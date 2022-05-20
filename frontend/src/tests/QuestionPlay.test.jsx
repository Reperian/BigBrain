import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import QuestionPlay from '../components/QuestionPlay';
import AnswerPlay from '../components/AnswerPlay';

describe('QuestionPlay', () => {
  const question = {
    id: "shboivpl",
    title: "test",
    thumbnail: 'random.jpg',
    time: 30,
    points: 0,
    answers: [
      {
        id: "zvrbpon",
        text: "yes",
        correct: true
      },
      {
        id: "kaltflbx",
        text: "no",
        correct: false
      }
    ]
  }

  it('renders question title correctly', () => {
    const questionPlay = shallow(<QuestionPlay question={question}/>);
    const title = questionPlay.find('h1').first();
    expect(title.text()).toBe('test');
  });

  it('renders default text when question is not given', () => {
    const questionPlay = shallow(<QuestionPlay />);
    const title = questionPlay.find('h1').first();
    expect(title.text()).toBe('Waiting for Question...');
  })

  it('renders thumbnail of the question', () => {
    const questionPlay = shallow(<QuestionPlay question={question}/>);
    const img = questionPlay.find('img').first();
    expect(img.props().src).toBe('random.jpg');
  })

  it('renders the right amount of answers', () => {
    const questionPlay = shallow(<QuestionPlay question={question}/>);
    const answers = questionPlay.find(AnswerPlay);
    expect(answers.length).toBe(2);
  })
})