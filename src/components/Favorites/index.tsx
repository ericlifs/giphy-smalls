import { observer } from 'mobx-react-lite';
import React, { useContext, useMemo } from 'react';
import { Gif } from 'interfaces';
import { ProfileStoreContext } from 'stores';
import { GifImage } from 'ui';
import './index.scss';

const Favorites: React.FC = () => {
  const profileStore = useContext(ProfileStoreContext);

  // Called when a gif image gets clicked
  const onImageClicked = (gif: Gif) => {
    window.open(gif.images.original.url, '_blank');
  };

  const FavoritesContent = useMemo(() => {
    const favoritesIds = Object.keys(profileStore.favorites);

    // If the user has favorites added return the list of faved gifs
    if (favoritesIds.length > 0) {
      return favoritesIds.map((id: string) => (
        <GifImage onImageClicked={onImageClicked} key={id} gif={profileStore.favorites[id]} />
      ));
    }

    // If the user doesn't have favorites added return a copy instead
    return <h3 className="favorites__no-favs">You have not added any fav yet :(</h3>;
  }, [profileStore.favorites]);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Your favs</h1>
      <article className="favorites__content">{FavoritesContent}</article>
    </section>
  );
};

export default observer(Favorites);
