import {combineReducers} from 'redux'
import search,* as searchFuncs from './searchState'


/*
search state only needs to be called search, because
its always referenced like this state.search,
*/
export default combineReducers({
    search
});




export const isSearchPageLoading = (state)=>searchFuncs.isLoading(state.searchState)
export const searchResults = (state) => searchFuncs.searchResults(state.searchState)
