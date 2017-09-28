import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  RECEIVE_POST
} from '../actions'

const categories = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return action.categories || state
    default :
      return state
  }
}

const posts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_POSTS :
      return action.posts || state
    case RECEIVE_POST :
      return state.find(post => post.id === action.post.id) ? 
      state.map(post => post.id === action.post.id ? action.post : post) :
      state.concat(action.post)
    default:
      return state
  }
}

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments || state
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
