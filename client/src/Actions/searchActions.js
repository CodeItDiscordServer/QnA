import {SET_SEARCH_RESULTS,
  FETCHING,UPDATE_POST_FILTER} from '../ActionTypes/ActionTypes'
import { G_SRCH_RSLTS_URL} from '../ActionTypes/UrlTypes';

import axios from "axios";
/*

ASYNC ACTIONS ARE FUNCTIONS THAT DISPATCH ACTIONS MEANWHILE CALLING
API'S AND OTHER THINGS

*/

const HTTP_MSGS ={
    404:"NO RESULTS",
    405:"CAN'T CONNECT TO SERVER"
}

export const set_filter = (filter) =>{
  return {
    type:UPDATE_POST_FILTER,
    filter
  }
}

// the type fetching is first state of the sequence
export const INIT_FETCH= ()=>({
    type:FETCHING
})

export const updateSearchResults = (status=404,results=[]) =>({
    type:SET_SEARCH_RESULTS,
    status:status,
    results:results
})



export const SearchSequence = (filters) => dispatch => {


    // Set state to loading
    dispatch(INIT_FETCH());

    // Async calls to the server

    /*Fetchlifecycle methods implmented in search
    action rather than seperate file

    we would still have a then/catch clause in this
    function anyways.
        */

    //POST is the only way to change teh content type to application/json,
    // however we might be able to do a get, if we url encode the search.
    // i think axios made it a design paradim that you cant send a request
    // body with a get.
    axios['post'](G_SRCH_RSLTS_URL,
      JSON.stringify(filters),
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        }
      })
    .then(function(resp){
      if(resp.status===200){
        dispatch(updateSearchResults(resp.status,resp.data.results));
          return;
      }
      else{
        if(resp.status === 400){
          this.reject({
            "code": resp.status,
            "message": HTTP_MSGS[`${resp.status}`]
          })
        }
        else if(resp.status === 404){
          this.reject({
            "code": resp.status,
            "message": HTTP_MSGS[`${resp.status}`]
          })

        }
        else{
          this.reject({
            "code": resp.status,
            "message": resp
          });
        }

      }
    })
    .catch(function(e){
      console.log(`\n\n\t${JSON.stringify(e)}\n`);

      /* this makes page state rerturn undefined.

      */
      dispatch(updateSearchResults(500,[])
      );
      return;
    })



}
