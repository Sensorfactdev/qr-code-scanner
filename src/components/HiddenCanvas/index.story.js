import React from 'react';
import { storiesOf } from '@storybook/react';
import HiddenCanvas from './index';

storiesOf('HiddenCanvas', module)
  .add('default view', () => (
    <HiddenCanvas />
  ));
