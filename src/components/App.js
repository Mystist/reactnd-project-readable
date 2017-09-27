import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'

import PostList from './PostList'
import PostDetail from './PostDetail'
import * as Static from './Static'

class App extends Component {
  componentDidMount() {
    this.props.fetchCategories()
    this.props
      .fetchPosts()
      .then(() => this.props.fetchComments(this.props.posts))
  }
  render() {
    return (
      <div className="app my-3">
        <Route path="/static/post-list" component={Static.PostList} />
        <Route path="/static/post-detail" component={Static.PostDetail} />

        <Route exact path="/:category?" component={PostList} />
        <Route exact path="/posts/:id" component={PostDetail} />
      </div>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchComments: (posts) => dispatch(fetchComments(posts))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
