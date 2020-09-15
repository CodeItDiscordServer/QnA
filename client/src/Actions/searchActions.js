import {SET_SEARCH_RESULTS,
  FETCHING,UPDATE_POST_FILTER,LOADING_SCROLL,
APPEND_SEARCH_RESULTS} from '../ActionTypes/ActionTypes'
import { G_SRCH_RSLTS_URL} from '../ActionTypes/UrlTypes';

import axios from "axios";
import qs from "query-string";
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
export const INIT_SCROLL = () => ({
  type: LOADING_SCROLL
})

export const updateSearchResults = (status=404,results=[]) =>({
    type:SET_SEARCH_RESULTS,
    status:status,
    results:results
})

export const appendSearchResults= (status,results=[]) =>({
    type:APPEND_SEARCH_RESULTS,
    results:results,
    status
})


export const InfiniteScroll = (filters,pickUpFromHere) => dispatch =>{
  dispatch(INIT_SCROLL())
  // var deepcopy = JSON.parse(JSON.stringify(filters))
  let encodedtags = []
  Object.keys(filters.tags).forEach(function(key){
    if(filters.tags[key]){
      encodedtags.push(key)
    }
  })
  filters.skip = pickUpFromHere;
  filters.tags = encodedtags.join(","); // url encode does not work with objects
  axios['get'](`${G_SRCH_RSLTS_URL}?${qs.stringify(filters)}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    })
  .then(function(resp){
    if(resp.status===200){
      dispatch(appendSearchResults(200,resp.data.results));
        return;
    }
    else {
      this.reject({
        "code": resp.status,
        "message": resp
      });
    }
  })
  .catch(function(eer){
    console.log(eer);
      dispatch(appendSearchResults([]));

  })
}


export const SearchSequence = (filters) => dispatch => {


    // Set state to loading
    dispatch(INIT_FETCH());

    // Async calls to the server

    /*Fetchlifecycle methods implmented in search
    action rather than seperate file

    we would still have a then/catch clause in this
    function anyways.
        */
    // we will use get request because i was having trouble doing pagination with th post request
    // also i think this is much easier
    let encodedtags = []
    Object.keys(filters.tags).forEach(function(key){
      if(filters.tags[key]){
        encodedtags.push(key)
      }
    })
    filters.tags = encodedtags.join(","); // url encode does not work with objects
    axios['get'](`${G_SRCH_RSLTS_URL}?${qs.stringify(filters)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
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
