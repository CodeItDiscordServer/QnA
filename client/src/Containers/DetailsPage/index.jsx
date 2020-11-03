/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import {Component} from 'react'
import { Divider } from '@material-ui/core'
import { LinearProgress } from "@material-ui/core"
import {Link} from "react-router-dom"
import {connect} from 'react-redux';


import {isSearchPageLoading,
        getPiazzaDetails} from "../../Reducers/index.js"
import {DetailsJsonSearchSequence} from  "../../Actions/searchActions.js"
import ShareLinkAlert from "../../components/LinkToDetails.js"


const stateToProps = state =>({
  isLoading: isSearchPageLoading(state),
  details: getPiazzaDetails(state),
})

const dispatchToProps = {
  DetailsJsonSearchSequence
}





class DetailsPage extends Component {

  componentDidMount(){
    if(!this.props.details.length && this.props.ids.length){
      this.props.DetailsJsonSearchSequence(this.props.ids)
    }
  }

  renderDetails(){

    return (<div>
      {this.props.details.length && this.props.details.map(function(post,index){
        return (
          <div key={`post-#-${index}`} className="post-card">
              <p>Tags</p>
              {
                post.tags.map(function(tag,tagI){
                  return (
                    <span key={`post-${index}-tag-${tagI}`} className="tag">
                      {tag}
                    </span>
                  )
                })
              }
              <h5>{post.post.subject}</h5>
              <p>{post.post.content}</p>

              <h6>Replies</h6>
              {
                post.replies.map(function(reply,replyI){
                  return (
                  <div key={`post-${index}-reply-${replyI}`}>
                    <p>{reply.reply}</p>
                    {reply.followups.length && (<h6>Followups</h6>)}
                    {
                        reply.followups.length && reply.followups.map(function(followup,follI){
                              return (
                                <p key={`post-${index}-reply-${replyI}-followup-${follI}`}>
                                  {followup.reply}
                                </p>
                              )
                      })
                    }
                  </div>
                  )
                })
              }



              <hr />

          </div>
        )
      })}

    </div>)

  }

  render(){
    let {isLoading,ids} = this.props;
    return (
        <div className="DetailsListContainer">
        {isLoading && (<LinearProgress />)}


        <Link to="/" style={{zIndex: 5}}>Back To Search</Link>
        <ShareLinkAlert ids={ids}  />
          <Divider variant="middle"/>
          {/* We have a context Provider
            to hold the local state of the each active post.*/}
          {!isLoading && this.renderDetails()}

        </div>
      )
  }
}

export default connect(stateToProps,dispatchToProps)(DetailsPage);
