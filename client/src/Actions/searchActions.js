import {TOGGLE_TAG,SEARCH,SET_SEARCH_RESULTS,
  FETCHING,
  UPDATE_POST_FILTER} from '../ActionTypes/ActionTypes'
import { G_SRCH_RSLTS_URL} from '../ActionTypes/UrlTypes';

import axios from "axios";
/*

ASYNC ACTIONS ARE FUNCTIONS THAT DISPATCH ACTIONS MEANWHILE CALLING
API'S AND OTHER THINGS

*/

const status ={
    404:"NO RESULTS",
    405:"CAN'T CONNECT TO SERVER"
}

export const set_filter = (filter) =>{
  console.log(filter);
  return {
    type:UPDATE_POST_FILTER,
    filter
  }
}

export const fetching = ()=>({
    type:FETCHING
})

export const updateSearchResults = (status=404,results=[]) =>({
    type:SET_SEARCH_RESULTS,
    status:status,
    results:results
})



export const SearchSequence = (filters) => dispatch => {
    let results = []
    let status=200;

    // Set state to loading
    dispatch(fetching());

    // Async calls to the server

    /*Fetchlifecycle methods implmented in search
    action rather than seperate file

    we would still have a then/catch clause in this
    function anyways.
        */
    axios['post'](G_SRCH_RSLTS_URL,filters)
    .then(function(resp){
      if(resp.status===200){
        dispatch(updateSearchResults(status=resp.status,
          results = resp.data));
          return;
      }
      else{
        throw {
          "code": resp.status,
          "message": resp
        };
      }
    })
    .catch(function(e){
      console.log(e);
      dispatch(updateSearchResults(status=500,
        results = [] ));
    })



}
