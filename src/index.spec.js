import React from 'react';
import renderer from 'react-test-renderer';
import Button from './index';

describe('Button', () => {
  it('should show the given text', () => {
    const text = 'The Text';
    const component = renderer.create(<Button>{text}</Button>).toJSON();
    expect(component).toMatchSnapshot();
  });
});
