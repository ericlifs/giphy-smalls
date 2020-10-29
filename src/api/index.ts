import CONFIG from './config';

interface QueryParams {
  [key: string]: any;
}

class Api {
  async get<T>(endpoint: string, params: QueryParams = {}): Promise<T> {
    const mappedParams = Object.entries(params)
      .map(([key, value]) => `&${key}=${value}`)
      .join();

    const res = await fetch(
      `${CONFIG.API_BASE_PATH}/${endpoint}?api_key=${process.env.REACT_APP_GIPHY_API_TOKEN}${mappedParams}`,
    );

    const jsonRes = await res.json();

    return jsonRes.data as T;
  }
}

export default new Api();

export const API_CONFIG = CONFIG;
