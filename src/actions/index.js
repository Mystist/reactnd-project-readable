import * as api from '../utils/api'
import * as types from './types'

export const receiveCategories = categories => ({ type: types.RECEIVE_CATEGORIES, categories })

export const fetchCategories = () => dispatch => (
  api
    .fetchCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)

export const receivePosts = posts => ({ type: types.RECEIVE_POSTS, posts })

export const fetchPosts = () => dispatch => (
  api
    .fetchPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

export const receiveComments = comments => ({ type: types.RECEIVE_COMMENTS, comments })

export const fetchComments = posts => dispatch => {
  const promises = []
  posts.forEach(post => {
    promises.push(api.fetchCommentsByPost(post))
  })
  Promise.all(promises).then(results => {
    const comments = results.length > 0 ? results.reduce((accumulator, currentValue) => accumulator.concat(currentValue)) : []
    dispatch(receiveComments(comments))
  })
}

export const receivePost = post => ({ type: types.RECEIVE_POST, post })
export const deletePost = post => ({ type: types.DELETE_POST, post })

export const fetchPost = (post, body) => dispatch => {
  const promise = api.fetchPost(post, body)

  if (post.isDelete) {
    promise.then(post => dispatch(deletePost(post)))
  } else {
    promise.then(post => dispatch(receivePost(post)))
  }

  return promise
}

export const receiveComment = comment => ({ type: types.RECEIVE_COMMENT, comment })
export const deleteComment = comment => ({ type: types.DELETE_COMMENT, comment })

export const fetchComment = (comment, body) => dispatch => {
  const promise = api.fetchComment(comment, body)

  if (comment.isDelete) {
    promise.then(comment => dispatch(deleteComment(comment)))
  } else {
    promise.then(comment => dispatch(receiveComment(comment)))
  }

  return promise
}
