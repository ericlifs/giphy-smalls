import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { GifsStoreContext } from 'stores';
import GifsGrid from 'ui/GifsGrid';

const SearchResultsGifs: React.FC = () => {
  const gifsStore = useContext(GifsStoreContext);

  useEffect(() => {
    gifsStore.fetchTrendingGifs();
  }, []);

  return (
    <GifsGrid
      title={gifsStore.gridTitle}
      loading={gifsStore.isFetching}
      gifs={gifsStore.gifsToShowInGrid}
    />
  );
};

export default observer(SearchResultsGifs);
