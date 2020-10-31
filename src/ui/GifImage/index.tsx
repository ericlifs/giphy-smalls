import React from 'react';
import { Gif } from '../../interfaces/gifs';
import FavButton from '../FavButton';
import './index.scss';

interface GifImageProps {
  gif: Gif;
}

const GifImage: React.FC<GifImageProps> = ({ gif }: GifImageProps) => {
  return (
    <div className="gif-image" key={gif.images.original.url}>
      <img
        className="gif-image__gif"
        src={gif.images.original.url}
        alt={gif.title}
        loading="lazy"
      />
      <FavButton active={false} />
    </div>
  );
};

export default GifImage;
