import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import post from './post'

export default combineReducers({
  posts,
  categories,
  comments,
  post,
  form: formReducer,
})
