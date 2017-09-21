import React, { Component } from 'react'

class Category extends Component {
  render() {
    return (
      <nav className="nav nav-pills nav-fill">
        <a className="nav-item nav-link active" href="#">All</a>
        <a className="nav-item nav-link" href="#">React</a>
        <a className="nav-item nav-link" href="#">Redux</a>
        <a className="nav-item nav-link" href="#">udacity</a>
      </nav>
    )
  }
}

export default Category
