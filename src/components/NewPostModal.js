import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import PostModal from './PostModal'

const mapStateToProps = () => ({
  post: {
    id: uuid(),
    timestamp: Date.now(),
    isNew: true
  }
})

export default connect(mapStateToProps)(PostModal)
