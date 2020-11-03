import {SET_SEARCH_RESULTS,
  FETCHING,UPDATE_POST_FILTER,LOADING_SCROLL,
APPEND_SEARCH_RESULTS,
SET_REACT_POST_DETAILS} from '../ActionTypes/ActionTypes'
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
const initialData = {
  "results": [],
  "cursor": null
}
export const updateSearchResults = (status=404,data=initialData) =>{
  return {
      type:SET_SEARCH_RESULTS,
      status:status,
      results:data["results"],
      cursor: data["cursor"],
  }
}

const updatePostDetailsReact = (status=500,data=[]) =>{
  return {
    type: SET_REACT_POST_DETAILS,
    status,
    data
  }
}


export const appendSearchResults= (status,data=initialData) =>({
    type:APPEND_SEARCH_RESULTS,
    results:data["results"],
    cursor: data["cursor"],
    status
})



export const DetailsJsonSearchSequence = (ids) => dispatch => {
  dispatch(INIT_FETCH());


  axios['get'](`/api/json-details?dump=${ids.join(",")}`)
  .then(function(resp){
    if(resp.status===200){
      dispatch(updatePostDetailsReact(resp.status,resp.data.dump));
      return;
    }
    else{
        this.reject({
          "code": resp.status,
          "message": resp
        });
    }
  })
  .catch(function(e){
    console.log(`\n\n\t${JSON.stringify(e)}\n`);

    /* this makes page state rerturn undefined.

    */
    dispatch((500,[])
    );
    return;
  })
}


export const InfiniteScroll = (filters,pickUpFromHere) => dispatch =>{
  dispatch(INIT_SCROLL())
  var deepcopy = JSON.parse(JSON.stringify(filters))
  let encodedtags = []
  Object.keys(deepcopy.tags).forEach(function(key){
    if(deepcopy.tags[key]){
      encodedtags.push(key)
    }
  })
  deepcopy.skip = pickUpFromHere;
  deepcopy.tags = encodedtags.join(","); // url encode does not work with objects



  setTimeout(function(){

    axios['get'](`${G_SRCH_RSLTS_URL}?${qs.stringify(deepcopy)}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      }
    })
    .then(function(resp){
      if(resp.status===200){
        dispatch(appendSearchResults(200,resp.data));
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


  },420);
}

const LIMIT = 15
export const SearchSequence = (filters) => dispatch => {

    // Set state to loading
    dispatch(INIT_FETCH());

    // Async calls to the server
    var encodedfilter = JSON.parse(JSON.stringify(filters))
    /*Fetchlifecycle methods implmented in search
    action rather than seperate file

    we would still have a then/catch clause in this
    function anyways.
        */
    // we will use get request because i was having trouble doing pagination with th post request
    // also i think this is much easier
    let encodedtags = []
    Object.keys(encodedfilter.tags).forEach(function(key){
      if(encodedfilter.tags[key]){
        encodedtags.push(key)
      }
    })
    encodedfilter.tags = encodedtags.join(","); // url encode does not work with objects
    axios['get'](`${G_SRCH_RSLTS_URL}?${qs.stringify(encodedfilter)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        }
      })
    .then(function(resp){
      if(resp.status===200){
        dispatch(updateSearchResults(resp.status,resp.data));
        if(resp.data.results.length < LIMIT){
          dispatch(InfiniteScroll(encodedfilter,resp.data.cursor))
        }
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
