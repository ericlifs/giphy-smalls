import { action, computed, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import api, { API_CONFIG } from '../api';
import { FetchStatus } from '../interfaces/fetchStatus';
import { Gif } from '../interfaces/gifs';

class GifsStore {
  constructor() {
    makeAutoObservable(this);
  }

  protected searchTerm: string = '';

  public trendingGifs: Gif[] = [];

  public searchResultsGifs: Gif[] = [];

  public fetchTrendingStatus = FetchStatus.Initial;

  public fetchSearchStatus = FetchStatus.Initial;

  @computed public get isFetching(): boolean {
    return (
      this.fetchSearchStatus === FetchStatus.Fetching ||
      this.fetchTrendingStatus === FetchStatus.Fetching
    );
  }

  @computed public get gridTitle(): string {
    if (this.fetchSearchStatus === FetchStatus.Fetched) {
      return `Gifs for ${this.searchTerm}`;
    }

    if (!this.searchTerm) {
      return 'Trending gifs';
    }

    return '';
  }

  @computed public get gifsToShowInGrid(): Gif[] {
    if (this.searchResultsGifs.length) {
      return this.searchResultsGifs;
    }

    return this.trendingGifs;
  }

  @action
  public async fetchTrendingGifs(): Promise<void> {
    this.fetchTrendingStatus = FetchStatus.Fetching;

    try {
      const data: Gif[] = await api.get<Gif[]>(API_CONFIG.ENDPOINTS.TRENDING, { limit: 10 });

      this.fetchTrendingStatus = FetchStatus.Fetched;
      this.trendingGifs = data;
    } catch (error) {
      this.fetchTrendingStatus = FetchStatus.Error;
    }
  }

  @action
  public clearSearchResults(): void {
    this.fetchSearchStatus = FetchStatus.Initial;
    this.searchResultsGifs = [];
    this.searchTerm = '';
  }

  @action
  public async searchGifsByTerm(query: string): Promise<void> {
    this.fetchSearchStatus = FetchStatus.Fetching;
    this.searchTerm = query;

    try {
      const data = await api.get<Gif[]>(API_CONFIG.ENDPOINTS.SEARCH, { limit: 20, q: query });

      this.fetchSearchStatus = FetchStatus.Fetched;
      this.searchResultsGifs = data;
    } catch (error) {
      this.fetchSearchStatus = FetchStatus.Error;
    }
  }
}

export default createContext(new GifsStore());
