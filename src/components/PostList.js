import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'

import Post from './Post'

class PostList extends Component {
  state = {
    order: 'votes'
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

  render() {
    const { match, categories, posts } = this.props
    const currentPosts = posts.filter(post => !match.params.category || post.category === match.params.category).sort((a, b) => {
      if (this.state.order === 'votes') {
        return b.voteScore - a.voteScore
      } else {
        return b.timestamp - a.timestamp
      }
    })

    return (
      <div className="post-list">
        <div className="container">
          {categories.length > 0 && (
            <nav className="nav nav-pills nav-fill">
              <Link to="/" className={`nav-item nav-link ${!match.params.category ? 'active' : ''}`}>ALL</Link>
              {categories.map(category => (
                <Link to={`/${category.name}`} key={category.name} className={`nav-item nav-link ${match.params.category === category.name ? 'active' : ''}`} >{category.name.toUpperCase()}</Link>
              ))}
            </nav>
          )}
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
            <button type="button" className="btn btn-outline-primary">New Post</button>
          </div>
        </div>
        <div className="container">
          {currentPosts.length > 0 && (
            <ul className="list-unstyled">
              {currentPosts.map(post => (
                <li key={post.id} className="border border-top-0 border-left-0 border-right-0 my-3">
                  <Post post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
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
  fetchComments: posts => dispatch(fetchComments(posts))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
