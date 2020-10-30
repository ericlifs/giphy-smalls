import { action, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import api, { API_CONFIG } from '../api';
import { FetchStatus } from '../interfaces/fetchStatus';
import { Gif } from '../interfaces/gifs';

class GifsStore {
  constructor() {
    makeAutoObservable(this);
  }

  public trendingGifs: Gif[] = [];

  public fetchStatus = FetchStatus.Initial;

  @action
  public async fetchTrendingGifs(): Promise<void> {
    this.fetchStatus = FetchStatus.Fetching;

    try {
      const data: Gif[] = await api.get<Gif[]>(API_CONFIG.ENDPOINTS.TRENDING, { limit: 10 });

      this.fetchStatus = FetchStatus.Fetched;
      this.trendingGifs = data;
    } catch (error) {
      console.log(error);
      this.fetchStatus = FetchStatus.Error;
    }
  }
}

export const GifsStoreContext = createContext(new GifsStore());
