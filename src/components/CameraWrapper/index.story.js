import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraWrapper from './index';

storiesOf('CameraWrapper', module)
  .add('default view', () => (
    <CameraWrapper />
  ));
