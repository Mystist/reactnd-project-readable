import * as api from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

// export const receiveCategories = categories => ({ type: RECEIVE_CATEGORIES, categories })
export const receiveCategories = (categories) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories: categories
  }
}

// export const fetchCategories = () => dispatch => (
//   api
//     .fetchCategories()
//     .then(categories => dispatch(receiveCategories(categories)))
// )
export const fetchCategories = () => {
  return (dispatch) => {
    api
      .fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)))
  }
}

export const receivePosts = posts => ({ type: RECEIVE_POSTS, posts })

export const fetchPosts = (category) => dispatch => (
  api
    .fetchPosts(category)
    .then(posts => dispatch(receivePosts(posts)))
)
