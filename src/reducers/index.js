import { combineReducers } from 'redux'

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  RECEIVE_POST,
  RECEIVE_COMMENT,
  DELETE_COMMENT
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
    default :
      return state
  }
}

const comments = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return action.comments || state
    case RECEIVE_COMMENT :
      return state.find(comment => comment.id === action.comment.id) ? 
        state.map(comment => comment.id === action.comment.id ? action.comment : comment) :
        state.concat(action.comment)
    case DELETE_COMMENT :
      return state.filter(comment => comment.id !== action.comment.id)
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
