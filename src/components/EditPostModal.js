import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCategories } from '../actions'
import PostModal from './PostModal'

class EditPostModal extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { post } = this.props

    return (
      <PostModal post={post} />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(null, mapDispatchToProps)(EditPostModal)