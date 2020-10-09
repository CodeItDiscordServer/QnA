import React, {useState} from 'react'
import SearchBox from './Components/SearchComponent'
import SearchResults from './Components/SearchResults'
import { Divider } from '@material-ui/core'

import {PostsSelected4Details} from "./SearchPageContext.js"




const SearchPage=(props)=>{
   var [selected, setArray] = useState([])
   const updateSelected = (id)=>{
     if(selected.includes(id)){
       let temp = []
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
       setArray(temp);
     }
     else{
       selected.push(id)
     }

   }
// (id)=> {console.log("add/remove",id);}
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

            <PostsSelected4Details.Consumer>
             { ({selected}) => {console.log(selected);}}
             </PostsSelected4Details.Consumer>
             <SearchResults />
          </PostsSelected4Details.Provider>
        </div>
      )
}


export default SearchPage;
