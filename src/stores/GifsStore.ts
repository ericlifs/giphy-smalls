import { createContext } from 'react';
import { action, computed, makeAutoObservable } from 'mobx';
import api, { API_CONFIG } from 'api';
import { FetchStatus, Gif } from 'interfaces';

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

    if (this.searchTerm === '' && !this.isFetching) {
      return 'Trending gifs';
    }

    return '';
  }

  @computed public get gifsToShowInGrid(): Gif[] {
    if (this.searchTerm !== '') {
      return this.searchResultsGifs;
    }

    return this.trendingGifs;
  }

  /**
   * Fetch giphy trending gifs.
   * @async
   */
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

  /**
   * Clear current's search results saved in the store and return the search state to the initial one.
   */
  @action
  public clearSearchResults(): void {
    this.fetchSearchStatus = FetchStatus.Initial;
    this.searchResultsGifs = [];
    this.searchTerm = '';
  }

  /**
   * Search giphy gifs by term.
   * @async
   * @param {string} query - term used for search
   */
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
