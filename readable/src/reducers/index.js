import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS,
  GET_POST,
  ADD_POST,
} from '../actions'

function posts (state = {}, action) {
  switch (action.type) {
    case GET_POSTS :
    console.log(action.posts)
      return action.posts
    case ADD_POST :
      return { ...state, [action.post.id]: action.post }
    default :
      return state
  }
}

function categories (state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function comments (state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS :
      return action.comment
    default :
      return state
  }
}

function post (state = {}, action) {
  switch (action.type) {
    case GET_POST :
      return action.post
    default :
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  comments,
  post,
  form: formReducer,
})