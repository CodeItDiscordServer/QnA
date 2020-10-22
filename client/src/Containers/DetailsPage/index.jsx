import React, {useState} from 'react'
import { Divider } from '@material-ui/core'



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

          <Divider variant="middle"/>
          {/* We have a context Provider
            to hold the local state of the each active post.*/}

        </div>
      )
}


export default DetailsPage;
