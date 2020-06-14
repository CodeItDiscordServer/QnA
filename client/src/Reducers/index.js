import {combineReducers} from 'redux'
import searchState,* as searchFuncs from './searchState'

export default combineReducers({
    searchState
});




export const isSearchPageLoading = (state)=>searchFuncs.isLoading(state.searchState)
export const searchResults = (state) => searchFuncs.searchResults(state.searchState)