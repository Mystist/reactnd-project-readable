import React, { Component } from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost } from '../actions'

class Post extends Component {
  getCommentsFromPost = (post) => {
    return this.props.comments.filter(comment => comment.parentId === post.id)
  }

  render() {
    const { post, isDetailView } = this.props

    return (
      <div className="post-container">
        <h6 className="text-secondary">
          <small>{post.category.toUpperCase()}</small>
          <span className="mx-2">&middot;</span>
          <small>{moment(post.timestamp).format('YYYY-MM-DD HH:mm:ss')}</small>
          <span className="mx-2">&middot;</span>
          <small>{post.author}</small>
        </h6>
        <h5 className="my-3">
          {isDetailView ?
            post.title :
            <Link to={`/posts/${post.id}`}>{post.title}</Link>  
          }
        </h5>
        {isDetailView && (
          <p>{post.body}</p>
        )}
        <h6 className="text-secondary d-flex justify-content-between">
          <small>{this.getCommentsFromPost(post).length} Comments</small>
          <div className="votes">
            <span className="oi oi-caret-top mx-3" onClick={() => this.props.fetchPost(post, 'upVote')}></span>
            <small>{post.voteScore}</small>
            <span className="oi oi-caret-bottom mx-3" onClick={() => this.props.fetchPost(post, 'downVote')}></span>
          </div>
        </h6>
      </div>
    )
  }
}

const mapStateToProps = ({ comments }) => ({
  comments
})

const mapDispatchToProps = dispatch => ({
  fetchPost: (post, option) => dispatch(fetchPost(post, option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
