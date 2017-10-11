import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPost } from '../actions'

const initialState = {
  title: '',
  body: '',
  author: '',
  category: 'react'
}

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required'
  } else if (values.title.length < 10) {
    errors.title = 'Title shoule be at least 10 words'
  }

  if (!values.body) {
    errors.body = 'Required'
  }

  return errors
}

const Invalid = ({ error }) => (
  <span className="text-danger">* {error}</span>
)

class PostModal extends Component {
  state = {
    ...initialState,
    hasTouched: false
  }

  componentDidMount() {
    if (!this.props.post.isNew) {
      const { title, body, author, category } = this.props.post
      this.setState({title, body, author, category})
    }
  }

  updateState = (name, value) => {
    this.setState({ [name]: value })
  }

  save = () => {
    const post = this.props.post
    this.setState({ hasTouched: true })

    if (Object.keys(validate(this.state)).length === 0) {
      const body = post.isNew ? {...post, ...this.state} : this.state
      this.props.fetchPost(post, body).then(() => {
        if (post.isNew) {
          this.setState(initialState)
        }
        this.setState({ hasTouched: false })
        this.refs.postModalClose.click()
      })
    }
  }

  render() {
    const { categories } = this.props
    const errors = validate(this.state)

    return (
      <form>
        <div className="modal fade" id="postModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{this.state.isNew ? 'New Post' : 'Edit Post'}</h5>
                <button type="button" className="close" data-dismiss="modal">×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" className="form-control" name="title" value={this.state.title} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                  {this.state.hasTouched && errors.title && (
                    <Invalid error={errors.title} />
                  )}
                </div>
                <div className="form-group">
                  <label>Body:</label>
                  <textarea className="form-control" name="body" value={this.state.body} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)}></textarea>
                  {this.state.hasTouched && errors.body && (
                    <Invalid error={errors.body} />
                  )}
                </div>
                <div className="form-group">
                  <label>Author: (optional)</label>
                  <input type="text" className="form-control" name="author" value={this.state.author} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)} />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  {categories.length > 0 && (
                    <select className="form-control" name="category" value={this.state.category} onChange={e => this.updateState(e.currentTarget.name, e.currentTarget.value)}>
                      {categories.map(category => (
                        <option key={category.name} value={category.name}>{category.name.toUpperCase()}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref="postModalClose">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.save}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

const mapDispatchToProps = dispatch => ({
  fetchPost: (post, body) => dispatch(fetchPost(post, body))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
