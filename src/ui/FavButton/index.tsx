import React from 'react';
import FavFilled from '../../assets/fav-filled.png';
import FavOutline from '../../assets/fav-outline.png';
import './index.scss';

interface FavButtonProps {
  active: boolean;
}

const FavButton: React.FC<FavButtonProps> = (props: FavButtonProps) => {
  const imgSrc = props.active ? FavFilled : FavOutline;

  return (
    <button className="fav-button">
      <img className="fav-button__icon" src={imgSrc} />
    </button>
  );
};

export default FavButton;
