import * as types from '../actions/types'

const categories = (state = [], action) => {
  switch (action.type) {
    case types.RECEIVE_CATEGORIES :
      return action.categories || state
    default :
      return state
  }
}

export default categories
