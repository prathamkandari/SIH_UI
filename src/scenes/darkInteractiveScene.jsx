import React, {useState, useEffect} from 'react';
import Spline from '@splinetool/react-spline';

export default function DarkInteractiveScene() {

  const canvasStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
  };

  return (
    <Spline
      scene="https://prod.spline.design/87ePDZZnPL0zDCrF/scene.splinecode"
      style={canvasStyles}
    />
  );
}
