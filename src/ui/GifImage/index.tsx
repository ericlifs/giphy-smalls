/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useMemo } from 'react';
import { Gif } from 'interfaces';
import { ProfileStoreContext } from 'stores';
import { FavButton } from 'ui';
import './index.scss';

interface GifImageProps {
  gif: Gif;
  onImageClicked: (gif: Gif) => void;
}

const GifImage: React.FC<GifImageProps> = ({ gif, onImageClicked }: GifImageProps) => {
  const profileStore = useContext(ProfileStoreContext);

  //prettier-ignore
  const isFavorite = useMemo(() => (
    profileStore.favorites[gif.id] !== undefined
  ), [profileStore.favorites]);

  // When the FavButton gets clicked we call the toggleFavorite function which
  // will add/remove the gif the favorites list
  const toggleGifFavorited = useCallback(() => {
    profileStore.toggleFavorite(gif);
  }, [gif]);

  return (
    <div className="gif-image" key={gif.images.original.url}>
      <img
        onClick={() => onImageClicked(gif)}
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
