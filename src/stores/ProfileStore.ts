/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import { Favorites, Gif } from 'interfaces';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  public favorites: Favorites = {};

  @action
  public toggleFavorite(gif: Gif) {
    this.favorites = this.getNewFavoritesStateForGif(gif);
  }

  protected getNewFavoritesStateForGif(gif: Gif): Favorites {
    if (this.favorites[gif.id]) {
      const { [gif.id]: faved, ...otherFavorites } = this.favorites;

      return otherFavorites;
    }

    return {
      ...this.favorites,
      [gif.id]: gif,
    };
  }
}

export default createContext(new ProfileStore());
