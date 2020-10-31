import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useMemo } from 'react';
import { Gif } from '../../interfaces/gifs';
import ProfileStoreContext from '../../stores/ProfileStore';
import FavButton from '../FavButton';
import './index.scss';

interface GifImageProps {
  gif: Gif;
}

const GifImage: React.FC<GifImageProps> = ({ gif }: GifImageProps) => {
  const profileStore = useContext(ProfileStoreContext);

  const isFavorite = useMemo(() => profileStore.favorites[gif.id] !== undefined, [
    profileStore.favorites,
  ]);

  const toggleGifFavorited = useCallback(() => {
    profileStore.toggleFavorite(gif);
  }, [gif]);

  return (
    <div className="gif-image" key={gif.images.original.url}>
      <img
        className="gif-image__gif"
        src={gif.images.original.url}
        alt={gif.title}
        loading="lazy"
      />
      <FavButton active={isFavorite} onPress={toggleGifFavorited} />
    </div>
  );
};

export default observer(GifImage);
