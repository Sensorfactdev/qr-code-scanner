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
      streamObject: null,
    };

    this.bindVideoStream = this.bindVideoStream.bind(this);
    this.onCreateSnap = this.onCreateSnap.bind(this);
  }

  componentDidMount() {
    const {
      navigator,
    } = global.window;
    const { width, height } = this.props;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: {
          width,
          height,
          aspectRatio: width / height,
          facingMode: 'environment',
        },
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          this.stream = stream;
          this.setState(() => ({
            streamObject: stream,
          }));

          raf(this.onCreateSnap);
        })
        .catch((error) => {
          this.setState(() => ({ error }));
        });
    }

    raf(this.bindVideoStream);
  }

  componentWillUnmount() {
    if (this.stream) {
      this.stream.getTracks()
        .forEach(track => track.stop());
    }
  }

  onCreateSnap() {
    const { onQrCodeScanned, width, height } = this.props;
    const qr = new QrCode();
    const context = this.canvas && this.canvas.getContext('2d');

    if (context) {
      context.drawImage(this.videoTag, 0, 0, width, height, 0, 0, width, height);
    }

    const imageData = this.canvas.toDataURL('image/png');

    qr.callback = (error, result) => {
      if (error) return raf(this.onCreateSnap);

      this.videoTag.pause();
      this.stream.getTracks()
        .forEach(track => track.stop());
      return onQrCodeScanned(result);
    };

    qr.decode(imageData);
  }

  bindVideoStream() {
    if (this.videoTag != null) {
      this.videoTag.srcObject = this.stream;
      return;
    }

    raf(this.bindVideoStream);
  }

  render() {
    const { streamObject, error } = this.state;
    const { width, height, showAimAssist } = this.props;

    if (error) {
      return (
        <Wrapper>
          An error occurred:
          <pre>
            {error.name}
            {error.message}
          </pre>
          Try a different phone
        </Wrapper>
      );
    }

    return (
      <Wrapper innerRef={(el) => { this.wrapper = el; }}>
        {streamObject &&
          <CameraWrapper
            showAimAssist={showAimAssist}
          >
            <CameraPreview
              videoRef={(el) => { this.videoTag = el; }}
            />
            <HiddenCanvas
              innerRef={(el) => { this.canvas = el; }}
              width={width}
              height={height}
            />
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
  showAimAssist: PropTypes.bool,
};

QrCodeScanner.defaultProps = {
  onQrCodeScanned: result => console && console.log('RESULT', result),
  width: global.window ? global.window.innerWidth : 360,
  height: global.window ? global.window.innerHeight : 480,
  showAimAssist: true,
};

export default QrCodeScanner;
