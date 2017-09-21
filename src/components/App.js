import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import PostList from './PostList'
import * as Static from './Static'

class App extends Component {
  render() {
    return (
      <div className="app my-3">
        <Route path="/static/post-list" component={Static.PostList} />
        <Route path="/static/post-detail" component={Static.PostDetail} />

        <Route exact path="/:category?" component={PostList} />
      </div>
    )
  }
}

export default App
