import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import { fetchCategories, fetchPosts, fetchComments, fetchPost } from '../actions'
import Post from './Post'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 10) {
    errors.title = 'Title shoule be at least 10 words'
  }

  if (!values.body) {
    errors.body = 'Required'
  }

  return errors
}

const Invalid = ({ error }) => (
  <span className="text-danger">* {error}</span>
)

class PostList extends Component {
  state = {
    order: 'votes',
    title: '',
    body: '',
    author: '',
    category: 'react',
    hasTouched: false
  }

  componentDidMount() {
    this.props.fetchCategories()
    this.props
      .fetchPosts()
      .then(() => this.props.fetchComments(this.props.posts))
  }

  changeOrder = (order) => {
    this.setState({
      order
    })
  }

  updateState = (name, value) => {
    this.setState({ [name]: value })
  }

  save = () => {
    this.setState({ hasTouched: true })

    if (Object.keys(validate(this.state)).length === 0) {
      this.props.fetchPost({...this.state,
        id: uuid(),
        timestamp: Date.now(),
        isNew: true
      }).then(() => {
        this.setState({
          title: '',
          body: '',
          author: '',
          category: 'react',
          hasTouched: false
        })
        this.refs.newPostModalClose.click()
      })
    }
  }

  render() {
    const { match, categories, posts } = this.props
    const currentPosts = posts.filter(post => !match.params.category || post.category === match.params.category).sort((a, b) => {
      if (this.state.order === 'votes') {
        return b.voteScore - a.voteScore
      } else {
        return b.timestamp - a.timestamp
      }
    })

    const errors = validate(this.state)

    return (
      <div className="post-list">
        {categories.length > 0 && (
          <div className="container">
            <nav className="nav nav-pills nav-fill">
              <Link to="/" className={`nav-item nav-link ${!match.params.category ? 'active' : ''}`}>ALL</Link>
              {categories.map(category => (
                <Link to={`/${category.name}`} key={category.name} className={`nav-item nav-link ${match.params.category === category.name ? 'active' : ''}`} >{category.name.toUpperCase()}</Link>
              ))}
            </nav>
          </div>
        )}
        {currentPosts.length > 0 && (
          <div className="container">
            <div className="d-flex justify-content-between my-4">
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  Order By: {this.state.order}
                </button>
                <div className="dropdown-menu">
                  <a className={`dropdown-item ${this.state.order === 'votes' ? 'active' : ''}`} onClick={() => this.changeOrder('votes')}>Votes</a>
                  <a className={`dropdown-item ${this.state.order === 'date' ? 'active' : ''}`} onClick={() => this.changeOrder('date')}>Date</a>
                </div>
              </div>
              <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#newPostModal">New Post</button>
            </div>
            <ul className="list-unstyled">
              {currentPosts.map(post => (
                <li key={post.id} className="border border-top-0 border-left-0 border-right-0 my-3">
                  <Post post={post} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {categories.length > 0 && (
          <form>
            <div className="modal fade" id="newPostModal" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">New Post</h5>
                    <button type="button" className="close" data-dismiss="modal">
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Title:</label>
                      <input type="text" className="form-control" name="title" value={this.state.title} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                      {this.state.hasTouched && errors.title && (
                        <Invalid error={errors.title} />
                      )}
                    </div>
                    <div className="form-group">
                      <label>Body:</label>
                      <textarea className="form-control" name="body" value={this.state.body} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)}></textarea>
                      {this.state.hasTouched && errors.body && (
                        <Invalid error={errors.body} />
                      )}
                    </div>
                    <div className="form-group">
                      <label>Author: (optional)</label>
                      <input type="text" className="form-control" name="author" value={this.state.author} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                    </div>
                    <div className="form-group">
                      <label>Category:</label>
                      <select className="form-control" name="category" value={this.state.category} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)}>
                        {categories.map(category => (
                          <option key={category.name} value={category.name}>{category.name.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" ref="newPostModalClose">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.save}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => ({
  categories,
  posts
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchComments: posts => dispatch(fetchComments(posts)),
  fetchPost: post => dispatch(fetchPost(post))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
