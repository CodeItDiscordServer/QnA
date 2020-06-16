import {combineReducers} from 'redux'
import search,* as searchFuncs from './searchState'


/*
search state only needs to be called search, because
its always referenced like this state.search,
*/
export default combineReducers({
    search
});




export const isSearchPageLoading = (state)=>{
    // alert(state.search.pageState.loading)
    return searchFuncs.isLoading(state.search)}

export const searchResults = (state) => searchFuncs.searchResults(state.search)
