import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import useDebounce from 'hooks/useDebounce';
import { GifsStoreContext } from 'stores';
import './index.scss';

const SearchBar: React.FC = () => {
  const gifsStore = useContext(GifsStoreContext);
  const [term, setTerm] = useState<string>('');
  const debouncedTerm = useDebounce<string>(term, 600);

  const onValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTerm(ev.target.value);
  };

  useEffect(() => {
    if (term === '') {
      gifsStore.clearSearchResults();
    }
  }, [term]);

  useEffect(() => {
    const trimmedTerm = debouncedTerm.trim();

    if (trimmedTerm !== '') {
      gifsStore.searchGifsByTerm(trimmedTerm);
    }
  }, [debouncedTerm]);

  return (
    <section className="search-bar">
      <input
        className="search-bar__input"
        placeholder="What gifs do you want to search for?"
        onChange={onValueChange}
        value={term}
      />
    </section>
  );
};

export default observer(SearchBar);
