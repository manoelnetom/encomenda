import React from 'react';
import Loader from 'react-loader-spinner';
import './styles.css';

// Spinner para loadings ocasionais
/*
Tipos de spinner: Audio, BallTriangle, Bars, Circles, Grid, Grid, Oval,
Puff, Rings, TailSpin, ThreeDots
*/

// Documentação para ver todas as props do spinner: https://www.npmjs.com/package/react-loader-spinner
function Spinner({
  type, color, height, width, timeout,
}) {
  return (
    <div className="spinnerContainer">
      <Loader type={type} color={color} height={height} width={width} />

    </div>
  );
}

export default Spinner;
