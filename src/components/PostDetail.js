import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost, fetchComments } from '../actions'
import Post from './Post'

class PostDetail extends Component {
  componentDidMount() {
    const { match } = this.props

    this.props
      .fetchPost({id: match.params.id})
      .then(action => this.props.fetchComments([action.post]))
  }

  render() {
    const { match, posts } = this.props
    const post = posts.find(post => post.id === match.params.id)

    return (
      <div className="post-detail">
        {post && (
          <div className="container">
            <Post post={post} isDetailView={true} />
            <hr />
          </div>
        )}
        <div className="container">
          <div className="d-flex justify-content-between my-4">
            <div className="dropdown">
              <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                Order Comments By: Votes
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item active" href="#">Votes</a>
                <a className="dropdown-item" href="#">Date</a>
              </div>
            </div>
            <button type="button" className="btn btn-sm btn-outline-primary">Write a Comment</button>
          </div>
        </div>
        <div className="container">
          <ul className="list-unstyled">
            <li>
              <h6 className="text-secondary">
                <small>Carlin</small>
                <span className="mx-2">&middot;</span>
                <small>6h</small>
              </h6>
              <p>
                Everyone says so after all.
              </p>
              <h6 className="text-secondary d-flex justify-content-end">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Edit</a>
                    <a className="dropdown-item" href="#">Delete</a>
                  </div>
                </div>
                <div className="votes">
                  <span className="oi oi-caret-top mx-3"></span>
                  <small>25109</small>
                  <span className="oi oi-caret-bottom mx-3"></span>
                </div>
              </h6>
            </li>
            <li>
              <h6 className="text-secondary">
                <small>Carlin</small>
                <span className="mx-2">&middot;</span>
                <small>6h</small>
              </h6>
              <p>
                Everyone says so after all.
              </p>
              <h6 className="text-secondary d-flex justify-content-end">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Edit</a>
                    <a className="dropdown-item" href="#">Delete</a>
                  </div>
                </div>
                <div className="votes">
                  <span className="oi oi-caret-top mx-3"></span>
                  <small>25109</small>
                  <span className="oi oi-caret-bottom mx-3"></span>
                </div>
              </h6>
              <ul className="list-unstyled ml-5">
                <li className="border border-secondary border-top-0 border-bottom-0 px-3">
                  <h6 className="text-secondary">
                    <small>Carlin</small>
                    <span className="mx-2">&middot;</span>
                    <small>6h</small>
                  </h6>
                  <p>
                    Everyone says so after all.
                  </p>
                  <h6 className="text-secondary d-flex justify-content-end">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">Reply</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Edit</a>
                        <a className="dropdown-item" href="#">Delete</a>
                      </div>
                    </div>
                    <div className="votes">
                      <span className="oi oi-caret-top mx-3"></span>
                      <small>25109</small>
                      <span className="oi oi-caret-bottom mx-3"></span>
                    </div>
                  </h6>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

const mapDispatchToProps = dispatch => ({
  fetchPost: post => dispatch(fetchPost(post)),
  fetchComments: posts => dispatch(fetchComments(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
