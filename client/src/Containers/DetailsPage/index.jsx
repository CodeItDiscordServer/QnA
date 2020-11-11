/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/core';
import { Component } from 'react'
import { Divider } from '@material-ui/core'
import { LinearProgress } from "@material-ui/core"

import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import {
  isSearchPageLoading,
  getPiazzaDetails
} from "../../Reducers/index.js"
import { DetailsJsonSearchSequence } from "../../Actions/searchActions.js"
import ShareLinkAlert from "../../components/LinkToDetails.js"


const stateToProps = state => ({
  isLoading: isSearchPageLoading(state),
  details: getPiazzaDetails(state),
})

const dispatchToProps = {
  DetailsJsonSearchSequence
}





class DetailsPage extends Component {

  componentDidMount() {
    if (this.props.ids.length && this.props.ids.length !== this.props.details.length) {
      this.props.DetailsJsonSearchSequence(this.props.ids)
    }
  }

  renderDetails() {
    return (<div>
      {this.props.details.length > 0 && this.props.details.map(function (post, index) {
        return (
          <div key={`post-#-${index}`} className="post-card">
            {
              post.tags.map(function (tag, tagI) {
                return (
                  <span key={`post-${index}-tag-${tagI}`}
                    className="details-tag">
                    {tag}
                  </span>
                )
              })
            }
            <p className="details-question-subject">{post.post.subject}</p>
            <p className="details-question-content">{post.post.content}</p>

            <h6>Replies</h6>
            {
              post.replies.map(function (reply, replyI) {
                return (
                  <div key={`post-${index}-reply-${replyI}`}
                    className="details-reply">
                    <p>{reply.reply}</p>
                    {reply.followups.length > 0 && (<h6>Followups</h6>)}
                    {
                      reply.followups.length > 0 && reply.followups.map(function (followup, follI) {
                        return (
                          <p key={`post-${index}-reply-${replyI}-followup-${follI}`}
                            className="details-followup">
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

  render() {
    let { isLoading, ids } = this.props;
    return (
      <div className="DetailsListContainer">
        {isLoading && (<LinearProgress />)}


        <Button type="button">
          <Link to="/" style={{ zIndex: 5 }}>
            Back To Search
            </Link>
        </Button>
        <ShareLinkAlert ids={ids} />
        <Divider variant="middle" />
        {/* We have a context Provider
            to hold the local state of the each active post.*/}
        {!isLoading && this.renderDetails()}

      </div>
    )
  }
}

export default connect(stateToProps, dispatchToProps)(DetailsPage);
