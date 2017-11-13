import React from 'react';
import { storiesOf } from '@storybook/react';
import QrCodeScanner from './index';

storiesOf('QrCodeScanner', module)
  .add('default view', () => (
    <QrCodeScanner />
  ));
