import React from 'react';
import { storiesOf, action } from '@storybook/react';
import QrCodeScanner from './index';

storiesOf('QrCodeScanner', module)
  .add('default view', () => (
    <QrCodeScanner
      onQrCodeScanned={(result) => {
        action('onQrCodeScanned');
        console.log(result);
      }}
    />
  ))
  .add('with passed width and height', () => (
    <QrCodeScanner
      onQrCodeScanned={(result) => {
        action('onQrCodeScanned');
        console.log(result);
      }}
      width={480}
      height={360}
    />
  ));
