# QR Code Scanner

[![Build Status](https://travis-ci.org/Sensorfactdev/qr-code-scanner.svg?branch=master)](https://travis-ci.org/Sensorfactdev/qr-code-scanner)
[![Known Vulnerabilities](https://snyk.io/test/npm/@sensorfactdev/qr-code-scanner/badge.svg)](https://snyk.io/test/npm/@sensorfactdev/qr-code-scanner)
[![npm version](https://badge.fury.io/js/%40sensorfactdev%2Fqr-code-scanner.svg)](https://badge.fury.io/js/%40sensorfactdev%2Fqr-code-scanner)
[![Package Quality](http://npm.packagequality.com/badge/@sensorfactdev/qr-code-scanner.png)](http://packagequality.com/#?package=@sensorfactdev/qr-code-scanner)

## Usage

```javascript
import QrCodeScanner from '@sensorfactdev/qr-code-scanner';

const handleScanResult = result => {
  console.log(result);
  // {
  //   "result": "RESULT STRING VALUE",
  //   "points": [
  //     {
  //       "x": 171,
  //       "y": 445,
  //       "count": 2,
  //       "estimatedModuleSize": 3.857142857142857
  //     },
  //     // .... more points
  //   ]
  // }
}

const MyApp = () => (
  <div>
    <QrCodeScanner
      onQrCodeScanned={handleScanResult}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  </div>
)
```

### Props

| Key             | Type     | Default Value        |
|:----------------|:---------|:---------------------|
| onQrCodeScanned | Function | `console.log`        |
| width           | Number   | `window.innerWidth`  |
| height          | Number   | `window.innerHeight` |

## Development

To start Storybook:
```
yarn start
```

To run the tests:
```
yarn test
```

To run tests in watch mode:
```
yarn test --watch
```

Building the module
```
yarn build
```
