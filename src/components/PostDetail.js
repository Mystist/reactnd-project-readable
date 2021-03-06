import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as moment from 'moment'
import uuid from 'uuid/v4'

import * as actions from '../actions'
import Post from './Post'
import PostModal from './PostModal'
import CommentModal from './CommentModal'

class PostDetail extends Component {
  state = {
    order: 'date',
    selectedPost: {},
    selectedComment: {}
  }

  componentDidMount() {
    const { match } = this.props

    this.props
      .fetchPost({id: match.params.id})
      .then(post => this.props.fetchComments([post]))
  }

  changeOrder = order => {
    this.setState({ order })
  }

  onPostEdit = post => {
    this.setState({ selectedPost: post })
  }

  onPostDeleted = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    const { match, posts, comments } = this.props
    const post = posts.find(post => post.id === match.params.id)
    const currentComments = comments.filter(comment => comment.parentId === post.id).sort((a, b) => {
      if (this.state.order === 'votes') {
        return b.voteScore - a.voteScore
      } else {
        return b.timestamp - a.timestamp
      }
    })

    return (
      <div className="post-detail">
        <div className="container">
          <Link to="/" className='btn btn-outline-secondary'>Back</Link>
        </div>
        {post && (
          <div className="container">
            <Post post={post} isDetailView={true} onPostEdit={this.onPostEdit} onPostDeleted={this.onPostDeleted} />
            <hr />
          </div>
        )}
        <div className="container">
          <div className="d-flex justify-content-end my-4">
            {currentComments.length > 0 && (
              <div className="dropdown mr-auto">
                <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  Order By: {this.state.order}
                </button>
                <div className="dropdown-menu">
                  <a className={`dropdown-item ${this.state.order === 'date' ? 'active' : ''}`} onClick={() => this.changeOrder('date')}>Date</a>
                  <a className={`dropdown-item ${this.state.order === 'votes' ? 'active' : ''}`} onClick={() => this.changeOrder('votes')}>Votes</a>
                </div>
              </div>
            )}
            {post && (
              <button type="button" className="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#commentModal" 
                onClick={() => this.setState({ selectedComment: { id: uuid(), timestamp: Date.now(), parentId: post.id, isNew: true } })}>
                Write a Comment
              </button>
            )}
          </div>
          {currentComments.length > 0 && (
            <ul className="list-unstyled">
              {currentComments.map(comment => (
                <li key={comment.id}>
                  <h6 className="text-secondary">
                    {comment.author && (
                      <span>
                        <small>{comment.author}</small>
                        <span className="mx-2">&middot;</span>
                      </span>
                    )}
                    <small>{moment(comment.timestamp).format('YYYY-MM-DD HH:mm:ss')}</small>
                  </h6>
                  <p>
                    {comment.body}
                  </p>
                  <h6 className="text-secondary d-flex justify-content-end">
                    <div className="btn-group mx-4">
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-toggle="modal" data-target="#commentModal"
                        onClick={() => this.setState({ selectedComment: comment })}>
                        Edit
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="javascript:;" onClick={() => this.props.fetchComment({ ...comment, isDelete: true })}>Delete</a>
                      </div>
                    </div>
                    <div className="votes align-self-center">
                      <span className="oi oi-caret-top mx-3" onClick={() => this.props.fetchComment(comment, {option: 'upVote'})}></span>
                      <small>{comment.voteScore}</small>
                      <span className="oi oi-caret-bottom mx-3" onClick={() => this.props.fetchComment(comment, {option: 'downVote'})}></span>
                    </div>
                  </h6>
                </li>
              ))}
            </ul>
          )}
        </div>

        <PostModal post={this.state.selectedPost} />
        <CommentModal comment={this.state.selectedComment} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
})

export default connect(mapStateToProps, actions)(PostDetail)
