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
    const { post, isDetailView, onPostEdit, onPostDeleted } = this.props

    return (
      <div className="post-container">
        <h6 className="text-secondary my-4">
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
          <div className="btn-group mx-4">
            <button type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#postModal" onClick={() => onPostEdit(post)}>Edit</button>
            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="javascript:;" onClick={() => this.props.fetchPost({ ...post, isDelete: true }).then(onPostDeleted ? onPostDeleted() : null)}>Delete</a>
            </div>
          </div>
          <div className="votes align-self-center">
            <span className="oi oi-caret-top mx-3" onClick={() => this.props.fetchPost(post, {option: 'upVote'})}></span>
            <small>{post.voteScore}</small>
            <span className="oi oi-caret-bottom mx-3" onClick={() => this.props.fetchPost(post, {option: 'downVote'})}></span>
          </div>
        </h6>
      </div>
    )
  }
}

const mapStateToProps = ({ comments }) => ({
  comments
})

export default connect(mapStateToProps, { fetchPost })(Post)
