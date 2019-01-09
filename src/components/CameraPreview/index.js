import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InnerCameraPreview = styled.video`
`;

const CameraPreview = ({ videoRef }) => (
  <InnerCameraPreview
    autoPlay
    innerRef={(el) => { videoRef(el); }}
  />
);

CameraPreview.propTypes = {
  videoRef: PropTypes.func.isRequired,
};

export default CameraPreview;
