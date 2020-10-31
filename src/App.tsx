import React from 'react';
import Favorites from './components/Favorites';
import SearchBar from './components/SearchBar';
import TrendingGifs from './components/TrendingGifs';

function App() {
  return (
    <main className="app">
      <Favorites />
      <SearchBar />
      <TrendingGifs />
    </main>
  );
}

export default App;
