import React from 'react';
import renderer from 'react-test-renderer';
import QrCodeScanner from './index';

describe('QrCodeScanner', () => {
  it('should render', () => {
    const component = renderer.create(
      <QrCodeScanner
        onQrCodeScanned={f => f}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render with passed width and height', () => {
    const component = renderer.create(
      <QrCodeScanner
        onQrCodeScanned={f => f}
        width={480}
        height={360}
      />
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
