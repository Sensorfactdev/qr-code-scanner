import React, { Component } from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import styled from 'styled-components';
import QrCode from 'qrcode-reader';

import CameraPreview from './components/CameraPreview';

const Wrapper = styled.div`
  position: relative;
`;

const CameraWrapper = styled.div`
  &:after {
    content: "";
    display: block;
    position: fixed;
    top: 30%; left: 25%;
    width: 50%; height: 25%;
    border: 5px solid limegreen;
  }
`;

const HiddenCanvas = styled.canvas`
  display: none;
  width: ${window.innerWidth}px; height: ${window.innerHeight}px;
  border: 1px solid green;
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
      innerHeight,
      innerWidth,
    } = global.window;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: {
          width: innerWidth,
          height: innerHeight,
          aspectRatio: 1.5,
          facingMode: 'environment',
        },
      };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.setState(() => ({
          streamUrl: createObjectURL(stream),
        }));

        raf(this.onCreateSnap);
      })
      .catch((error) => {
        this.setState(() => ({
          error,
        }));
      });
    }
  }

  onCreateSnap() {
    const { onQrCodeScanned } = this.props;
    const context = this.canvas.getContext('2d');
    const qr = new QrCode();

    context.drawImage(this.videoTag, 0, 0, window.innerWidth, window.innerHeight);
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

    if (error) {
      return (
        <Wrapper>
          Rear camera not available
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
            <HiddenCanvas innerRef={(el) => { this.canvas = el; }} width="640" height="480" />
          </CameraWrapper>
        }
      </Wrapper>
    );
  }
}

QrCodeScanner.propTypes = {
  onQrCodeScanned: PropTypes.func.isRequired,
};

QrCodeScanner.defaultProps = {
  onQrCodeScanned: result => console && console.log('RESULT', result),
};

export default QrCodeScanner;
