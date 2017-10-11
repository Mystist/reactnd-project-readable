import React, { Component } from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost } from '../actions'
import EditPostModal from './EditPostModal'

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
          {post.author && (
            <span>
              <span className="mx-2">&middot;</span>
              <small>{post.author}</small>
            </span>
          )}
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
        <h6 className="text-secondary d-flex justify-content-end">
          <small className="mr-auto">{this.getCommentsFromPost(post).length} Comments</small>
          {isDetailView && (
            <div className="btn-group mx-4">
              <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
              <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="javascript:;" data-toggle="modal" data-target="#postModal">Edit</a>
                <a className="dropdown-item" href="#">Delete</a>
              </div>
            </div>
          )}
          <div className="votes align-self-center">
            <span className="oi oi-caret-top mx-3" onClick={() => this.props.fetchPost(post, {option: 'upVote'})}></span>
            <small>{post.voteScore}</small>
            <span className="oi oi-caret-bottom mx-3" onClick={() => this.props.fetchPost(post, {option: 'downVote'})}></span>
          </div>
        </h6>

        {isDetailView && (
          <EditPostModal post={post} />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ comments }) => ({
  comments
})

const mapDispatchToProps = dispatch => ({
  fetchPost: (post, body) => dispatch(fetchPost(post, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
