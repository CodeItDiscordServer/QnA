import React, {useState} from 'react'
import { Divider } from '@material-ui/core'
import {connect} from 'react-redux';

import SearchResults from './Components/SearchResults'
import SearchBox from './Components/SearchComponent'
import {PostsSelected4Details} from "./SearchPageContext.js"
import LinkToDetails from "./Components/LinkToDetails.js";



const SearchPage=(props)=>{
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
        <div className="SearchContainer">
          <SearchBox />
          <Divider variant="middle"/>
          {/* We have a context Provider
            to hold the local state of the each active post.*/}
          <PostsSelected4Details.Provider
              value={{
                  selected,
                  update: updateSelected
                }}>
                <LinkToDetails selected={selected} />
                <SearchResults active={selected}/>
          </PostsSelected4Details.Provider>
        </div>
      )
}


export default SearchPage;
