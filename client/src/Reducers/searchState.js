const initialState = {
    searchResults : [],
    filters:{
        tags:tags_hardcoded
    }
}



const tags_hardcoded={
    "hw1": false,
    "hw2": false,
    "hw3": false,
    "hw4": false
  };

const SEARCH_URL = "http://localhost:5000/api/search";

const searchState = (state=initialState,action)=>{
    switch(action.type){    
        


        default:
            return state
    }
}

export default searchState;