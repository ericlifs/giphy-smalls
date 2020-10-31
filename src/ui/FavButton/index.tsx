import React from 'react';
import FavFilled from '../../assets/fav-filled.png';
import FavOutline from '../../assets/fav-outline.png';
import './index.scss';

interface FavButtonProps {
  active: boolean;
  onPress: () => void;
}

const FavButton: React.FC<FavButtonProps> = ({ active, onPress }: FavButtonProps) => {
  const imgSrc = active ? FavFilled : FavOutline;

  return (
    <button className="fav-button" onClick={onPress}>
      <img className="fav-button__icon" src={imgSrc} />
    </button>
  );
};

export default React.memo(FavButton);
