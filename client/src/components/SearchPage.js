import React from "react";


import ResponsiveSearchBox from "./ResponsiveSearchBox.js";
import NetworkSpinner from "./NetworkSpinner";


const SEARCH_URL = "/api/search";

const tags_hardcoded={
  "hw1": false,
  "hw2": false,
  "hw3": false,
  "hw4": false
};


function SearchPage(props){
  const [search,setSearchTerm] = React.useState(null);
  const [isLoading, toggleLoading] = React.useState(null);
  return (
    <div>
    {search && isLoading && (<NetworkSpinner
      method={"post"}
      url={SEARCH_URL}
      body={search}
      />)}
      <ResponsiveSearchBox tags={tags_hardcoded} Search={function(obj){
        setSearchTerm(obj);
        toggleLoading(true);
      }}/>
      {search && <p>{JSON.stringify(search)}</p>}

    </div>
  )
}


export default SearchPage
