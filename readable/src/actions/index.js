import API from '../utils';

export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_COMMENTS = 'GET_COMMENTS'
export const GET_POST = 'GET_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'

export function getPosts(category) {
  let posts = API.getPosts(category)

  return {
    type: GET_POSTS,
    posts
  }
}

export function getCategories(categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}