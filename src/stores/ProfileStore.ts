/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { action, makeAutoObservable } from 'mobx';
import { Favorites, Gif } from 'interfaces';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  public favorites: Favorites = {};

  /**
   * Adds or removes gif from favorites lists
   * @param {Gif} gif - Gif object which will be added/removed from favorites list
   */
  @action
  public toggleFavorite(gif: Gif) {
    this.favorites = this.getNewFavoritesStateForGif(gif);
  }

  /**
   * Returns new version of the favorites list with the gif added/removed from the favorites list
   * @param {Gif} gif - Gif object which will be added/removed from favorites list
   */
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
