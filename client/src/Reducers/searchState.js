import {FETCHING,SET_SEARCH_RESULTS,SEARCH,TOGGLE_TAG} from '../ActionTypes/ActionTypes'
const initialState = {
    searchResults : [],
    filters:{
        tags:tags_hardcoded
    },

    pageState:{
        loading:false
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
        case FETCHING:
            let newState = Object.assign({},state,{pageState:{loading:true}})
            return newState
        
        case SET_SEARCH_RESULTS:
            if(action.status===404)
                let newState = Object.assign({},state,{
                    pageState:{loading:false,error:true,message:"No Search Results"},
                })
            else if(action.status ===200){
                let newState = Object.assign({},state,{
                    pageState:{loading:false,error:true,message:"No Search Results"},
                })
            }
        
        default:
            return state
    }
}

export default searchState;