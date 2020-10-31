import React from 'react';
import { Favorites, SearchBar, SearchResultsGifs } from 'components';
import 'styles/index.scss';

function App() {
  return (
    <main className="app">
      <Favorites />
      <SearchBar />
      <SearchResultsGifs />
    </main>
  );
}

export default App;
