const baseURL = 'http://localhost:5001'

const headers = new Headers()
headers.append('Authorization', 'readable-auth-123')
headers.append('Content-Type', 'application/json')

const getHeaders = {
  method: 'GET',
  headers: headers,
}
const postHeaders = {
  method: 'POST',
  headers: headers,
}
// const putHeaders = { method: 'PUT', headers: headers, };
// const deleteHeaders = { method: 'DELETE', headers: headers, };

function getPosts(category = undefined) {
  let fetchURL = `${baseURL}`

  if (category !== undefined) {
    fetchURL = `${baseURL}/${category}`
  }

  return fetch(`${fetchURL}/posts`, getHeaders).then(response =>
    response.json()
  )
}

function getCategories() {
  return fetch(`${baseURL}/categories`, getHeaders).then(response =>
    response.json()
  )
}

function getComments(postId) {
  return fetch(
    `${baseURL}/posts/${postId}/comments`,
    getHeaders
  ).then(response => response.json())
}

function getPost(postId) {
  return fetch(`${baseURL}/posts/${postId}`, getHeaders).then(response =>
    response.json()
  )
}

function createPost(values) {
  postHeaders.body = JSON.stringify(values)

  return fetch(`${baseURL}/posts/`, postHeaders).then(response =>
    response.json()
  )
}

export default {
  getPosts,
  getCategories,
  getComments,
  getPost,
  createPost,
}
