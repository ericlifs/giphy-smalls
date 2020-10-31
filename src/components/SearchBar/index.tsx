import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useDebounce } from 'hooks';
import { GifsStoreContext } from 'stores';
import './index.scss';

const SearchBar: React.FC = () => {
  const gifsStore = useContext(GifsStoreContext);
  const [term, setTerm] = useState<string>('');
  const debouncedTerm = useDebounce<string>(term, 600);

  // Called when the input value changed
  const onValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTerm(ev.target.value);
  };

  // This will be called when the term changes
  useEffect(() => {
    // If the input value is now empty we clear the previous results
    if (term === '') {
      gifsStore.clearSearchResults();
    }
  }, [term]);

  // This will be called when the deboucedTerm changes (no the term itself)
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
