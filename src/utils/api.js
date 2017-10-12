const headers = { 'Authorization': 'whatever-you-want' }
const baseUrl = 'http://localhost:3001'

export const fetchCategories = () => {
  return fetch(`${baseUrl}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export const fetchPosts = () => {
  return fetch(`${baseUrl}/posts`, { headers })
    .then(res => res.json())
}

export const fetchCommentsByPost = post => {
  return fetch(`${baseUrl}/posts/${post.id}/comments`, { headers })
    .then(res => res.json())
}

export const fetchPost = (post, body) => {
  if (post.isNew) {
    return fetch(`${baseUrl}/posts`, { headers: {...headers, 'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(body) })
      .then(res => res.json())
  } else if (body) {
    const method = body.option ? 'POST' : 'PUT'
    return fetch(`${baseUrl}/posts/${post.id}`, { headers: {...headers, 'Content-Type': 'application/json'}, method, body: JSON.stringify(body) })
      .then(res => res.json())
  } else {
    return fetch(`${baseUrl}/posts/${post.id}`, { headers })
      .then(res => res.json())
  }
}

export const fetchComment = (comment, body) => {
  if (comment.isNew) {
    return fetch(`${baseUrl}/comments`, { headers: {...headers, 'Content-Type': 'application/json'}, method: 'POST', body: JSON.stringify(body) })
      .then(res => res.json())
  } else if (body) {
    const method = body.option ? 'POST' : 'PUT'
    return fetch(`${baseUrl}/comments/${comment.id}`, { headers: {...headers, 'Content-Type': 'application/json'}, method, body: JSON.stringify(body) })
      .then(res => res.json())
  } else {
    return fetch(`${baseUrl}/comments/${comment.id}`, { headers })
      .then(res => res.json())
  }
}
