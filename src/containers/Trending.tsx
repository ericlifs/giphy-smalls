import React, { useEffect, useState } from 'react';
import api from '../api';
import API_CONFIG from '../api/config';
import { Gif } from '../interfaces/gifs';
import GifsGrid from '../ui/GifsGrid';

const TrendingGifs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gifs, setGifs] = useState<Gif[]>([]);

  useEffect(() => {
    api
      .get<Gif[]>(API_CONFIG.ENDPOINTS.TRENDING, { limit: 10 })
      .then((data: Gif[]) => {
        setGifs(data);
        setLoading(false);
      });
  }, []);

  return <GifsGrid title="Trending Gifs" loading={loading} gifs={gifs} />;
};

export default TrendingGifs;
