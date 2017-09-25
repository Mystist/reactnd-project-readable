import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'

import PostList from './PostList'
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

        <Route exact path="/:category?" render={({ match }) => (
          <PostList categories={this.props.categories} posts={this.props.posts} comments={this.props.comments} match={match} />
        )} />
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     categories: state.categories,
//     posts: state.posts,
//     comments: status.comments
//   }
// }
const mapStateToProps = ({ categories, posts, comments }) => ({
  categories,
  posts,
  comments
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchComments: (posts) => dispatch(fetchComments(posts))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
