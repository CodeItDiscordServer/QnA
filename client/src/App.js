import React from 'react';
import './App.css';

import SearchPage from "./components/SearchPage";
import Banner from "./components/Banner.js";
function App() {
  return (
      <div>
        <Banner />
        <SearchPage />
      </div>
    );
}

export default App;
