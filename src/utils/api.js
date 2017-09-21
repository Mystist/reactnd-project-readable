const headers = { headers: { 'Authorization': 'whatever-you-want' }}

export const fetchCategories = () => {
  return fetch('http://localhost:5001/categories', headers)
    .then(res => res.json())
    .then(data => data.categories)
}

export const fetchPosts = (category) => {
  let url = `http://localhost:5001/${ category ? category + '/' : '' }posts`
  return fetch(url, headers)
    .then(res => res.json())
}
