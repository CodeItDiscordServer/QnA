import { combineReducers} from "redux"
import {FETCHING,
  SET_SEARCH_RESULTS,
  UPDATE_POST_FILTER,UPDATE_CLASS_ID,
  LOADING_SCROLL,
  APPEND_SEARCH_RESULTS,
SET_REACT_POST_DETAILS,} from '../ActionTypes/ActionTypes'



const misc = {
  "Instructor has answered": false,
  "Student has answered": false,
}

const tags_hardcoded={
    "hw1": false,
    "hw2": false,
    "hw3": false,
    "hw4": false,
    "project": false,
  };


const initialState = {
  PiazzaSearchResults : [],
    filterState:{
        ...misc,
        searchText: "",
        tags:tags_hardcoded,
    },

    pageState:{
        loading:false,
        searchResults: undefined,
        scrollLoading:false,
        piazzaPostDetails: [],
    }
}

const pageState =  (state=initialState.pageState,action)=>{
  let newState;
  switch(action.type){

        case FETCHING:
            newState = Object.assign({},state,{loading:true})
            return newState
        case LOADING_SCROLL:
            return Object.assign({},state,{scrollLoading:true})
        case SET_SEARCH_RESULTS:
          return Object.assign({},state,{loading:false,scrollLoading:false})
        case SET_REACT_POST_DETAILS:
          return Object.assign({},state,{loading:false, piazzaPostDetails: action.data})
        case APPEND_SEARCH_RESULTS:
        /* if status =200 and empty results that means we reached the end.*/
          if(action.status ===200 && ! action.results.length){
            return Object.assign({},state,{scrollLoading:true})
          }
          else{
            return Object.assign({},state,{scrollLoading:false})
          }
        default:
            return state;
    }
}

const filterState  = (state=initialState.filterState,action)=>{
    switch(action.type){
        case UPDATE_CLASS_ID:
          return {
            ...state,
            classid: action.id
          }
        case UPDATE_POST_FILTER:
        /* the entire filter is updated
        and calls this when something is modified
        in ResponsiveSearchBox*/
          return action.filter
        default:
          return state;
    }
}



const searchState = (state=initialState.PiazzaSearchResults,action)=>{
    switch(action.type){
        case SET_REACT_POST_DETAILS:
          return {
            ...state,
            detailIds: action.data
          }
        case SET_SEARCH_RESULTS:
            if(action.status===500){
                return state
              }
            else if(action.status ===200){
                return {
                ...state,
                results: action.results,
                cursor: action.cursor
              }
            }
            else if(action.status===303){
               return state
            }
            break;
          case APPEND_SEARCH_RESULTS:
              return {
                ...state,
                results: state.results.concat(action.results),
                cursor: action.cursor
              }
        default:
            return state
    }
}




export default combineReducers({
    searchState,
    pageState,
    filterState,
});



/* maybe move these to a file ./selectors.js
These are state selecors, we put them here and reference them in map state to props,
putting them here is better.
*/
export const pizzaPostIds = (state) =>state.searchState.detailIds
export const getPiazzaDetails = (state)=> state.pageState.piazzaPostDetails
export const getCursor = (state)=>state.searchState.cursor
export const isSearchPageLoading = (state)=>state.pageState.loading
export const isInfiniteLoading = (state)=>state.pageState.scrollLoading
export const searchResults = (state) => state.searchState.results
export const SearchPageFilters = (state) => state.filterState
