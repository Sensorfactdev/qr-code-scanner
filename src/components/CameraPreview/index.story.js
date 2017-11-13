import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraPreview from './index';

storiesOf('CameraPreview', module)
  .add('default view', () => (
    <CameraPreview
      source="hlrfjkle"
      videoRef={f => f}
    />
  ));
