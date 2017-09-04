import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_COMMENTS,
  GET_POST,
  ADD_POST,
} from '../actions';

function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      const posts = {};

      for (let post of action.payload) {
        posts[post.id] = post;
      }

      return posts;
    case ADD_POST:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const categories = action.payload.categories;

      return categories;
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      const comments = {};

      for (let comment of action.payload) {
        comments[comment.id] = comment;
      }

      return comments;
    default:
      return state;
  }
}

function post(state = {}, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories,
  comments,
  post,
  form: formReducer,
});
