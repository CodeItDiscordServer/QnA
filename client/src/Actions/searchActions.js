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
    console.log(filters);
    axios['get'](G_SRCH_RSLTS_URL,{...filters} )
    .then(function(resp){
      if(resp.status===200){
        dispatch(updateSearchResults({
            status: resp.status,
            results:resp.data
            })
          );
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
      dispatch(updateSearchResults({
          status: 500,
          results: []
        })
      );
      return;
    })



}
