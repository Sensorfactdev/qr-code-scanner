import React from 'react';
import renderer from 'react-test-renderer';
import CameraPreview from './index';

describe('CameraPreview', () => {
  it('should render', () => {
    const component = renderer.create(
      <CameraPreview
        source="blob://someblobl.com"
        videoRef={f => f}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
