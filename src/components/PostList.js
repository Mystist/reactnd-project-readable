import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class PostList extends Component {
  render() {
    const { match, categories, posts } = this.props
    const currentPosts = posts.filter(post => !match.params.category || post.category === match.params.category)

    return (
      <div className="post-list">
        <div className="container">
          {categories.length > 0 && (
            <nav className="nav nav-pills nav-fill">
              <Link to="/" className={`nav-item nav-link ${!match.params.category ? 'active' : ''}`}>All</Link>
              {categories.map(category => (
                <Link to={`/${category.name}`} key={category.name} className={`nav-item nav-link ${match.params.category === category.name ? 'active' : ''}`} >{category.name}</Link>
              ))}
            </nav>
          )}
          <div className="d-flex justify-content-between my-4">
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                Order By: Votes
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item active" href="#">Votes</a>
                <a className="dropdown-item" href="#">Date</a>
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
                  <h6 className="text-secondary">
                    <small>{post.category}</small>
                    <span className="mx-2">&middot;</span>
                    <small>{post.timestamp}</small>
                    <span className="mx-2">&middot;</span>
                    <small>{post.author}</small>
                  </h6>
                  <a href=""><h5 className="my-3">{post.title}</h5></a>
                  <h6 className="text-secondary d-flex justify-content-between">
                    <small>5 Comments</small>
                    <div className="votes">
                      <span className="oi oi-caret-top mx-3"></span>
                      <small>{post.voteScore}</small>
                      <span className="oi oi-caret-bottom mx-3"></span>
                    </div>
                  </h6>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PostList
