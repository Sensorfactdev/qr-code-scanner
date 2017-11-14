import React from 'react';
import renderer from 'react-test-renderer';
import CameraWrapper from './index';

describe('CameraWrapper', () => {
  it('should render', () => {
    const component = renderer.create(
      <CameraWrapper />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
