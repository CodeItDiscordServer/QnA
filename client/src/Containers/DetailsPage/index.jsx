import React, {useState} from 'react'
import { Divider } from '@material-ui/core'
import { LinearProgress } from "@material-ui/core"
import {Link} from "react-router-dom"
import {connect} from 'react-redux';


import {isSearchPageLoading,
        SearchPageFilters,
        pizzaPostIds} from "../../Reducers/index.js"



const stateToProps = state =>({
  isLoading: isSearchPageLoading(state),
  details: SearchPageFilters(state),
  ids: pizzaPostIds(state)
})





const DetailsPage=(props)=>{
    let {isLoading,details,ids} = props;

    return (
        <div className="DetailsListContainer">
        {isLoading && (<LinearProgress />)}

        <Link to="/">Back To Search</Link>

          <Divider variant="middle"/>
          {/* We have a context Provider
            to hold the local state of the each active post.*/}

        </div>
      )
}


export default connect(stateToProps,{})(DetailsPage);
