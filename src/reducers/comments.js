import * as types from '../actions/types'

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

export default comments
