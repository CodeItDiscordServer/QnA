import {TOGGLE_TAG,SEARCH,SET_SEARCH_RESULTS,FETCHING,UPDATE_SEARCH_TAG} from '../ActionTypes/ActionTypes'
import {getData} from '../Api/'

/*

ASYNC ACTIONS ARE FUNCTIONS THAT DISPATCH ACTIONS MEANWHILE CALLING
API'S AND OTHER THINGS

*/

const status ={
    404:"NO RESULTS",
    405:"CAN'T CONNECT TO SERVER"
}

export const updateTags = (tags)=>({
    type:TOGGLE_TAG,
    value:tags
})
export const updateSearchText = (text)=>({
    type:UPDATE_SEARCH_TAG,
    value:text
})
export const fetching = ()=>({
    type:FETCHING
})

export const updateSearchResults = (status=404,results=[]) =>({
    type:SET_SEARCH_RESULTS,
    status:status,
    results:results
})



export const search = (filters) => dispatch => {
    let results = []
    let status=200;

    // Set state to loading
    dispatch(fetching());

    // Async calls to the server
    getData('post','/api/search',filters)
    setTimeout(()=>{},2000);
    // Set state to loaded
    dispatch(updateSearchResults(status=status,results = results))

}
