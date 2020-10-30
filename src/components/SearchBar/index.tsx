import React, { ChangeEvent, useEffect, useState } from 'react';
import api from '../../api';
import API_CONFIG from '../../api/config';
import useDebounce from '../../hooks/useDebounce';
import { Gif } from '../../interfaces/gifs';
import './index.scss';

interface ISearchBarProps {}

const SearchBar: React.FC<ISearchBarProps> = () => {
  const [term, setTerm] = useState<string>('');
  const debouncedTerm = useDebounce<string>(term, 600);

  const onValueChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTerm(ev.target.value);
  };

  useEffect(() => {
    const trimmedTerm = debouncedTerm.trim();

    if (trimmedTerm !== '') {
      api
        .get<Gif[]>(API_CONFIG.ENDPOINTS.SEARCH, { limit: 20, q: trimmedTerm })
        .then((data: Gif[]) => {
          console.log(data);
        });
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

export default SearchBar;
