import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { FetchStatus } from '../../interfaces/fetchStatus';
import { GifsStoreContext } from '../../stores/GifsStore';
import GifsGrid from '../../ui/GifsGrid';

const TrendingGifs: React.FC = () => {
  const gifsStore = useContext(GifsStoreContext);

  useEffect(() => {
    gifsStore.fetchTrendingGifs();
  }, []);

  return (
    <GifsGrid
      title="Trending Gifs"
      loading={gifsStore.fetchStatus === FetchStatus.Fetching}
      gifs={gifsStore.trendingGifs}
    />
  );
};

export default observer(TrendingGifs);
