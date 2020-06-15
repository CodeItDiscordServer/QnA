import {FETCHING,SET_SEARCH_RESULTS,SEARCH,TOGGLE_TAG,UPDATE_SEARCH_TAG} from '../ActionTypes/ActionTypes'

const SEARCH_URL = "/api/search";

const tags_hardcoded={

    "hw1": false,
    "hw2": false,
    "hw3": false,
    "hw4": false
  };

const initialState = {
    searchResults : [],
    filters:{
        searchText: "",
        i_answer: false,
        s_answer: false,
        tags:tags_hardcoded
    },

    pageState:{
        loading:false
    }
}

const pageState =  (state=initialState.pageState,action)=>{
    switch(action.type){
        case FETCHING:
            let newState = Object.assign({},state,{loading:true})
            return newState
       
        default:
            return state;
    }
}

const filterState  = (state=initialState.filters,action)=>{
    switch(action.type){
        case TOGGLE_TAG:
            return Object.assign({},state,{tags:action.value})
        
        case UPDATE_SEARCH_TAG:
                return Object.assign({},state,{searchText:action.value})
        default:
        return state;
    }
}



const searchState = (state=initialState,action)=>{
    switch(action.type){
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
            return {
                searchresults:state.searchResults,
                pageState:pageState(state.pageState,action),
                filters:filterState(state.filterState,action)
            }
            return state
    }
}
/* these will notwork, with the combine reducers, now everytihg has another layer.
state.search.pageState.searchResults, but searchresuls is not even in pageState.

Done. :)
*/
export const isLoading = (state)=>state.pageState.isLoading
export const searchResults = (state) => state.pageState.searchResults
export default searchState;
