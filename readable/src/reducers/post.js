import { GET_POST, VOTE_POST, EDIT_POST, SET_POST_TO_EDIT } from '../actions'

function post(state = { post: {}, postToEdit: false }, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, post: action.payload }
    case VOTE_POST:
      if (state.post.id === action.payload.id) {
        return { ...state, post: action.payload }
      } else {
        return state
      }
    case EDIT_POST:
      return { post: action.payload, postToEdit: false }
    case SET_POST_TO_EDIT:
      return { ...state, postToEdit: action.payload }
    default:
      return state
  }
}

export default post
