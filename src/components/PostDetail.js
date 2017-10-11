import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { fetchPost, fetchComments, fetchComment } from '../actions'
import Post from './Post'

class PostDetail extends Component {
  state = {
    order: 'date'
  }

  componentDidMount() {
    const { match } = this.props

    this.props
      .fetchPost({id: match.params.id})
      .then(action => this.props.fetchComments([action.post]))
  }

  changeOrder = (order) => {
    this.setState({
      order
    })
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
        {post && (
          <div className="container">
            <Post post={post} isDetailView={true} />
            <hr />
          </div>
        )}
        {currentComments.length > 0 && (
          <div className="container">
            <div className="d-flex justify-content-between my-4">
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  Order By: {this.state.order}
                </button>
                <div className="dropdown-menu">
                  <a className={`dropdown-item ${this.state.order === 'date' ? 'active' : ''}`} onClick={() => this.changeOrder('date')}>Date</a>
                  <a className={`dropdown-item ${this.state.order === 'votes' ? 'active' : ''}`} onClick={() => this.changeOrder('votes')}>Votes</a>
                </div>
              </div>
              <button type="button" className="btn btn-sm btn-outline-primary">Write a Comment</button>
            </div>
            <ul className="list-unstyled">
              {currentComments.map(comment => (
                <li key={comment.id}>
                  <h6 className="text-secondary">
                    <small>{comment.author}</small>
                    <span className="mx-2">&middot;</span>
                    <small>{moment(comment.timestamp).format('YYYY-MM-DD HH:mm:ss')}</small>
                  </h6>
                  <p>
                    {comment.body}
                  </p>
                  <h6 className="text-secondary d-flex justify-content-end">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Delete</a>
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
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
})

const mapDispatchToProps = dispatch => ({
  fetchPost: post => dispatch(fetchPost(post)),
  fetchComments: posts => dispatch(fetchComments(posts)),
  fetchComment: (comment, body) => dispatch(fetchComment(comment, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
