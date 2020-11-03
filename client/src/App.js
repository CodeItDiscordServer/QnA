import React, {useState} from 'react'
import {Route} from "react-router-dom"


import './App.css';
import SearchPage from './Containers/SearchPage'
import DetailsPage from "./Containers/DetailsPage"
import {PostsSelected4Details} from "./Containers/SearchPage/SearchPageContext.js"

// import Banner from "./components/Banner.js";
function App() {

  var [selected, setArray] = useState([])
  const updateSelected = (id)=>{
    let temp = []
    if(selected.includes(id)){
      // in order replicata mutually exclusive
      // append function.
      for(let i=0;i<selected.length;i++){
        if(selected[i] === id){
          continue;
        }
        else{
          temp.push(selected[i])
        }
      }

      // possibly instead use
      // indexOf and delete?
      setArray(temp);
    }
    else{
      temp = JSON.parse(JSON.stringify(selected))
      temp.push(id)
      setArray(temp);
    }

  }


  return (
    <PostsSelected4Details.Provider
        value={{
            selected,
            update: updateSelected
          }}>
      <div style={{fontFamily:"Roboto"}}>
        <Route exact path="/" >
          <SearchPage />
        </Route>
        <Route exact path="/details">
          <DetailsPage ids={selected} />
        </Route>
      </div>
      </PostsSelected4Details.Provider>
    );
}

export default App;
