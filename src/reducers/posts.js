import * as types from '../actions/types'

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

export default posts
