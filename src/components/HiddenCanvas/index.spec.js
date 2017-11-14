import React from 'react';
import renderer from 'react-test-renderer';
import HiddenCanvas from './index';

describe('HiddenCanvas', () => {
  it('should render', () => {
    const component = renderer.create(
      <HiddenCanvas />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
