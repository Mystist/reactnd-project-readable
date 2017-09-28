import * as api from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

export const receiveCategories = categories => ({ type: RECEIVE_CATEGORIES, categories })

export const fetchCategories = () => dispatch => (
  api
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)

export const receivePosts = posts => ({ type: RECEIVE_POSTS, posts })

export const fetchPosts = () => dispatch => (
  api
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const receiveComments = comments => ({ type: RECEIVE_COMMENTS, comments })

export const fetchComments = posts => dispatch => {
  const defers = []
  posts.forEach(post => {
    defers.push(api.fetchCommentsByPost(post))
  })
  Promise.all(defers).then(results => {
    const comments = results.reduce((accumulator, currentValue) => accumulator.concat(currentValue))
    dispatch(receiveComments(comments))
  })
}

export const receivePost = post => ({ type: RECEIVE_POST, post })

export const fetchPost = (post, option) => dispatch => (
  api
    .fetchPost(post, option)
    .then(post => dispatch(receivePost(post)))
)

export const receiveComment = comment => ({ type: RECEIVE_COMMENT, comment })

export const fetchComment = (comment, option) => dispatch => (
  api
    .fetchComment(comment, option)
    .then(comment => dispatch(receiveComment(comment)))
)
