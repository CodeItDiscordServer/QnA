import {FETCHING,SET_SEARCH_RESULTS,SEARCH,TOGGLE_TAG} from '../ActionTypes/ActionTypes'



const tags_hardcoded={
    "hw1": false,
    "hw2": false,
    "hw3": false,
    "hw4": false
  };

const initialState = {
    searchResults : [],
    filters:{
        tags:tags_hardcoded
    },

    pageState:{
        loading:false
    }
}



const SEARCH_URL = "http://localhost:5000/api/search";

const searchState = (state=initialState,action)=>{
    switch(action.type){    
        case FETCHING:
            let newState = Object.assign({},state,{pageState:{loading:true}})
            return newState
        
        case SET_SEARCH_RESULTS:
            if(action.status===204){
                let newState = Object.assign({},state,{
                    pageState:{loading:false,error:true,message:"No Search Results"},
                })}
            else if(action.status ===200){
                let newState = Object.assign({},state,{
                    pageState:{loading:false},
                    searchResults: action.results
                })
                return newState
            }
            else if(action.status===303){}
        default:
            return state
    }
}

export const isLoading = (state)=>state.pageState.isLoading
export const searchResults = (state) => state.pageState.searchResults
export default searchState;