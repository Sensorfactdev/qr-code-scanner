import React from 'react';
import { storiesOf, action } from '@storybook/react';
import QrCodeScanner from './index';

storiesOf('QrCodeScanner', module)
  .add('default view', () => (
    <QrCodeScanner
      onQrCodeScanned={action('onQrCodeScanned')}
    />
  ))
  .add('with passed width and height', () => (
    <QrCodeScanner
      onQrCodeScanned={action('onQrCodeScanned')}
      width={480}
      height={360}
    />
  ));
