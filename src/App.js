import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as Static from './Static'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Route path="/static/post-list" component={Static.PostList} ></Route>
        <Route path="/static/post-detail" component={Static.PostDetail} ></Route>
      </div>
    )
  }
}

export default App
