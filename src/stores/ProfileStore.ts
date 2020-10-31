import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Favorites } from '../interfaces/favorites';

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }

  public favorites: Favorites = {};

  @action
  public toggleFavorite(id: string) {
    this.favorites[id] = !this.favorites[id];
  }
}

export default createContext(new ProfileStore());
