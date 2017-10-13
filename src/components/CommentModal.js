import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchComment } from '../actions'

const initialState = {
  body: '',
  author: ''
}

const validate = values => {
  const errors = {}
  if (!values.body) {
    errors.body = 'Required'
  }

  return errors
}

const Invalid = ({ error }) => (
  <span className="text-danger">* {error}</span>
)

class CommentModal extends Component {
  state = {
    ...initialState,
    hasTouched: false
  }

  componentDidUpdate(prevProps) {
    if (prevProps.comment.id !== this.props.comment.id) {
      const { comment: {body, author} } = this.props
      this.setState(this.props.comment.isNew ? initialState : { body, author })
    }
  }

  updateState = (name, value) => {
    this.setState({ [name]: value })
  }

  save = () => {
    const { comment } = this.props
    this.setState({ hasTouched: true })

    if (Object.keys(validate(this.state)).length === 0) {
      const body = comment.isNew ? {...comment, ...this.state} : this.state
      this.props.fetchComment(comment, body).then(() => {
        this.setState({ hasTouched: false })
        this.refs.commentModalClose.click()
      })
    }
  }

  render() {
    const errors = validate(this.state)

    return (
      <form>
        <div className="modal fade" id='commentModal' tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.props.comment.isNew ? 'Write a Comment' : 'Edit a Comment'}</h5>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Body:</label>
                  <textarea className="form-control" name="body" value={this.state.body} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                  {this.state.hasTouched && errors.body && (
                    <Invalid error={errors.body} />
                  )}
                </div>
                <div className="form-group">
                  <label>Author: (optional)</label>
                  <input type="text" className="form-control" name="author" value={this.state.author} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref="commentModalClose">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.save}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(null, { fetchComment })(CommentModal)
