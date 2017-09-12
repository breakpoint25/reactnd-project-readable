import API from '../utils'
import uuidv4 from 'uuid/v4'

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const GET_POST = 'GET_POST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const SORT_BY_POSTS = 'SORT_BY_POSTS'
export const SET_COMMENT_TO_EDIT = 'SET_COMMENT_TO_EDIT'
export const SET_POST_TO_EDIT = 'SET_POST_TO_EDIT'

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

export function getComments(id) {
  const response = API.getComments(id)

  return {
    type: GET_COMMENTS,
    payload: response,
  }
}

export function getPost(id) {
  const response = API.getPost(id)

  return {
    type: GET_POST,
    payload: response,
  }
}

export function createPost(values) {
  const body = {...values}
  body.timestamp = Date.now()
  body.id = uuidv4()

  const response = API.createPost(body)

  return {
    type: CREATE_POST,
    payload: response,
  }
}

export function createComment(values, id) {
  const body = {...values}
  body.parentId = id
  body.timestamp = Date.now()
  body.id = uuidv4()

  const response = API.createComment(body)

  return {
    type: CREATE_COMMENT,
    payload: response,
  }
}

export function editPost(values, id) {
  const body = {...values}
  body.timestamp = Date.now()

  const response = API.editPost(id, body)

  return {
    type: EDIT_POST,
    payload: response,
  }
}

export function editComment(values, id) {
  const body = {...values}
  body.timestamp = Date.now()

  const response = API.editComment(id, body)

  return {
    type: EDIT_COMMENT,
    payload: response,
  }
}

export function deletePost(id) {
  const response = API.deletePost(id)

  return {
    type: DELETE_POST,
    payload: response,
  }
}

export function deleteComment(id) {
  const response = API.deleteComment(id)

  return {
    type: DELETE_COMMENT,
    payload: response,
  }
}

export function updateVote(vote) {
  const response = API.updateVote(vote)

  return {
    type: VOTE_POST,
    payload: response,
  }
}

export function updateCommentVote(vote) {
  const response = API.updateCommentVote(vote)

  return {
    type: VOTE_COMMENT,
    payload: response,
  }
}

export function sortByPosts(eventKey) {
  return {
    type: SORT_BY_POSTS,
    payload: eventKey,
  }
}

export function setPostToEdit() {
  return {
    type: SET_POST_TO_EDIT,
  }
}

export function setCommentToEdit(id) {
  return {
    type: SET_COMMENT_TO_EDIT,
    payload: id,
  }
}