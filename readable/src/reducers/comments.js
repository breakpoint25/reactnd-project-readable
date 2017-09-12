import {
  GET_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  SET_COMMENT_TO_EDIT,
} from '../actions'

function comments(state = { comments: {}, commentToEdit: null }, action) {
  let comments
  let comment

  switch (action.type) {
    case GET_COMMENTS:
      comments = {}

      for (let comment of action.payload) {
        comments[comment.id] = comment
      }

      return { ...state, comments }
    case CREATE_COMMENT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.id]: action.payload,
        },
      }
    case EDIT_COMMENT:
      return {
        comments: {
          ...state.comments,
          [action.payload.id]: action.payload,
        },
        commentToEdit: null
      }
    case DELETE_COMMENT:
      comments = { ...state.comments }
      delete comments[action.payload.id]

      return { ...state, comments }
    case VOTE_COMMENT:
      comment = {
        ...state.comments[action.payload.id],
        ...action.payload,
      }

      return {
        ...state,
        comments: {
          ...state.comments,
          [comment.id]: comment,
        },
      }
    case SET_COMMENT_TO_EDIT:
      return { ...state, commentToEdit: action.payload }
    default:
      return state
  }
}

export default comments
