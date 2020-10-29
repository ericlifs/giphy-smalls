import React, { useEffect } from 'react';
import api, { API_CONFIG } from './api';
import logo from './logo.svg';

function App() {
  useEffect(() => {
    // This is just for testing the api functionality
    api.get(API_CONFIG.ENDPOINTS.TRENDING, { limit: 10 }).then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
