import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { GifsStoreContext } from 'stores';
import { GifsGrid } from 'ui';

const SearchResultsGifs: React.FC = () => {
  const gifsStore = useContext(GifsStoreContext);

  // When the component gets mounted we fetch the trending results
  useEffect(() => {
    if (gifsStore.trendingGifs.length === 0) {
      gifsStore.fetchTrendingGifs();
    }
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
