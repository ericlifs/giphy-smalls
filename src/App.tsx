import React from 'react';
import Favorites from 'components/Favorites';
import SearchBar from 'components/SearchBar';
import SearchResultsGifs from 'components/SearchResultsGifs';
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
