import { combineReducers } from 'redux'

import * as types from '../actions/types'

const categories = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_CATEGORIES :
      return action.categories || state
    default :
      return state
  }
}

const posts = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_POSTS :
      return action.posts || state
    case types.RECEIVE_POST :
      return state.find(post => post.id === action.post.id) ? 
        state.map(post => post.id === action.post.id ? action.post : post) :
        state.concat(action.post)
    case types.DELETE_POST :
      return state.filter(post => post.id !== action.post.id)
    default :
      return state
  }
}

const comments = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_COMMENTS :
      return action.comments || state
    case types.RECEIVE_COMMENT :
      return state.find(comment => comment.id === action.comment.id) ? 
        state.map(comment => comment.id === action.comment.id ? action.comment : comment) :
        state.concat(action.comment)
    case types.DELETE_COMMENT :
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
