import React from 'react';
import LoadingGif from 'assets/loading.gif';
import './index.scss';

const LoadingSpinner: React.FC = () => (
  <img className="loading-spinner" src={LoadingGif} alt="loading-spinner" />
);

export default LoadingSpinner;
