/* eslint-disable no-unused-vars */
import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Favorites } from '../interfaces/favorites';
import { Gif } from '../interfaces/gifs';

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
