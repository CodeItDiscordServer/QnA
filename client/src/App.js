import React from 'react'
import {Route} from "react-router-dom"


import './App.css';
import SearchPage from './Containers/SearchPage'
import DetailsPage from "./Containers/DetailsPage"

// import Banner from "./components/Banner.js";
function App() {
  return (

      <div style={{fontFamily:"Roboto"}}>
        <Route exact path="/" >
          <SearchPage />
        </Route>
        <Route exact path="/details">
          <DetailsPage />
        </Route>
      </div>
    );
}

export default App;
