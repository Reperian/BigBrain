import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import AnswerCorrect from '../components/AnswerCorrect';

describe('AnswerCorrect', () => {

  it('renders correct answers as green', () => {
    const temp = {
      id: '',
      text: 'test',
      correct: true
    }

    const answer = shallow(<AnswerCorrect answer={temp} correct={true}/>)
    const div = answer.find('div').get(0);
    expect(div.props.style).toHaveProperty('background', 'lightgreen');
  })

  it('renders incorrect answers as white', () => {
    const temp = {
      id: '',
      text: 'test',
      correct: true
    }

    const answer = shallow(<AnswerCorrect answer={temp} correct={false}/>)
    const div = answer.find('div').get(0);
    expect(div.props.style).toHaveProperty('background', 'white');
  })
})