import API from '../utils'
import uuidv4 from 'uuid/v4'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_POST = 'GET_POST'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export function getPosts(category) {
  const response = API.getPosts(category).then(posts => {
    const postPromises = posts.map(post => {
      return API.getComments(post.id)
    })

    return Promise.all(postPromises).then(comments => {
      return comments.map((comment, index) => {
        return { ...posts[index], comments: comment.length }
      })
    })
  })

  return {
    type: GET_POSTS,
    payload: response,
  }
}

export function getCategories() {
  const response = API.getCategories()

  return {
    type: GET_CATEGORIES,
    payload: response,
  }
}

export function getComments(postId) {
  const response = API.getComments(postId)

  return {
    type: GET_COMMENTS,
    payload: response,
  }
}

export function getPost(postId) {
  const response = API.getPost(postId)

  return {
    type: GET_POST,
    payload: response,
  }
}

export function createPost(values) {
  let body = values
  body.timestamp = Date.now()
  body.id = uuidv4()

  const response = API.createPost(body)

  return {
    type: CREATE_POST,
    payload: response,
  }
}
