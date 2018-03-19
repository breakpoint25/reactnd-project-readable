const baseURL = process.env.REACT_APP_API_URL

const headers = new Headers()
headers.append('Authorization', 'readable-auth-123')
headers.append('Content-Type', 'application/json')

const getHeaders = { method: 'GET', headers: headers }
const postHeaders = { method: 'POST', headers: headers }
const putHeaders = { method: 'PUT', headers: headers }
const deleteHeaders = { method: 'DELETE', headers: headers }

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

function getComments(id) {
  return fetch(`${baseURL}/posts/${id}/comments`, getHeaders).then(response =>
    response.json()
  )
}

function getPost(id) {
  return fetch(`${baseURL}/posts/${id}`, getHeaders).then(response =>
    response.json()
  )
}

function createPost(body) {
  postHeaders.body = JSON.stringify(body)

  return fetch(`${baseURL}/posts/`, postHeaders).then(response =>
    response.json()
  )
}

function createComment(body) {
  postHeaders.body = JSON.stringify(body)

  return fetch(`${baseURL}/comments/`, postHeaders).then(response =>
    response.json()
  )
}

function editPost(id, body) {
  putHeaders.body = JSON.stringify(body)

  return fetch(`${baseURL}/posts/${id}`, putHeaders).then(response =>
    response.json()
  )
}

function editComment(id, body) {
  putHeaders.body = JSON.stringify(body)

  return fetch(`${baseURL}/comments/${id}`, putHeaders).then(response =>
    response.json()
  )
}

function deletePost(id) {
  return fetch(`${baseURL}/posts/${id}`, deleteHeaders).then(response =>
    response.json()
  )
}

function deleteComment(id) {
  return fetch(`${baseURL}/comments/${id}`, deleteHeaders).then(response =>
    response.json()
  )
}

function updateVote({ id, type }) {
  postHeaders.body = JSON.stringify({ option: type })

  return fetch(`${baseURL}/posts/${id}`, postHeaders).then(response =>
    response.json()
  )
}

function updateCommentVote({ id, type }) {
  postHeaders.body = JSON.stringify({ option: type })

  return fetch(`${baseURL}/comments/${id}`, postHeaders).then(response =>
    response.json()
  )
}

export default {
  getPosts,
  getCategories,
  getComments,
  getPost,
  createPost,
  createComment,
  editPost,
  editComment,
  deletePost,
  deleteComment,
  updateVote,
  updateCommentVote,
}
