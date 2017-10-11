import React, { Component } from 'react'
import uuid from 'uuid/v4'

import PostModal from './PostModal'

class NewPostModal extends Component {
  render() {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      isNew: true
    }

    return (
      <PostModal post={post} />
    )
  }
}

export default NewPostModal
