import React, { Component } from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import styled from 'styled-components';
import QrCode from 'qrcode-reader';

import CameraWrapper from './components/CameraWrapper';
import CameraPreview from './components/CameraPreview';
import HiddenCanvas from './components/HiddenCanvas';

const Wrapper = styled.div`
  position: relative;
`;

class QrCodeScanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamUrl: null,
    };

    this.onCreateSnap = this.onCreateSnap.bind(this);
  }

  componentDidMount() {
    const {
      navigator,
      URL: { createObjectURL },
    } = global.window;
    const { width, height } = this.props;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: {
          width,
          height,
          aspectRatio: 1.5,
          facingMode: 'environment',
        },
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.setState(() => ({
            streamUrl: createObjectURL(stream),
          }));

          raf(this.onCreateSnap);
        })
        .catch((error) => {
          this.setState(() => ({ error }));
        });
    }
  }

  onCreateSnap() {
    const { onQrCodeScanned, width, height } = this.props;
    const context = this.canvas.getContext('2d');
    const qr = new QrCode();

    context.drawImage(this.videoTag, 0, 0, width, height);
    const imageData = this.canvas.toDataURL('image/png');

    qr.callback = (error, result) => {
      if (error) return raf(this.onCreateSnap);
      this.videoTag.pause();
      return onQrCodeScanned(result);
    };

    qr.decode(imageData);
  }

  render() {
    const { streamUrl, error } = this.state;
    const { width, height } = this.props;

    if (error) {
      return (
        <Wrapper>
          An error occurred:
          <pre>
            {error.toString()}
          </pre>
        </Wrapper>
      );
    }

    return (
      <Wrapper innerRef={(el) => { this.wrapper = el; }}>
        {streamUrl &&
          <CameraWrapper>
            <CameraPreview
              videoRef={(el) => { this.videoTag = el; }}
              source={streamUrl}
            />
            <HiddenCanvas innerRef={(el) => { this.canvas = el; }} width={width} height={height} />
          </CameraWrapper>
        }
      </Wrapper>
    );
  }
}

QrCodeScanner.propTypes = {
  onQrCodeScanned: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

QrCodeScanner.defaultProps = {
  onQrCodeScanned: result => console && console.log('RESULT', result),
  width: global.window ? global.window.innerWidth : 360,
  height: global.window ? global.window.innerHeight : 480,
};

export default QrCodeScanner;
