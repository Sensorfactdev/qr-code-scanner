# QR Code Scanner

![pipeline status](https://gitlab.com/Sensorfact/frontend/qr-code-scanner/badges/master/pipeline.svg)

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
