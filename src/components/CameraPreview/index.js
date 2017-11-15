import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InnerCameraPreview = styled.video`
`;

const CameraPreview = ({ source, videoRef }) => (
  <InnerCameraPreview
    autoPlay
    innerRef={(el) => { videoRef(el); }}
    src={source}
  />
);

CameraPreview.propTypes = {
  source: PropTypes.string.isRequired,
  videoRef: PropTypes.func.isRequired,
};

export default CameraPreview;
