import {
  GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  VOTE_POST,
  SORT_BY_POSTS,
} from '../actions'

function posts(state = { posts: {}, sortBy: 'voteScoreDesc' }, action) {
  let posts
  let post

  switch (action.type) {
    case GET_POSTS:
      posts = {}

      for (let post of action.payload) {
        posts[post.id] = post
      }

      return { ...state, posts }
    case CREATE_POST:
      // Adds comment count to default of 0 since payload
      // doesn't contain this field
      post = { ...action.payload }
      post.comments = 0

      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post,
        },
      }
    case DELETE_POST:
      posts = { ...state.posts }
      delete posts[action.payload.id]

      return { ...state, posts }
    case VOTE_POST:
      if (state.posts[action.payload.id]) {
        // Only change shared payload fields with existing post
        // since payload is missing comment count so can't fully
        // replace entire post with payload
        post = {
          ...state.posts[action.payload.id],
          ...action.payload,
        }

        return {
          ...state,
          posts: {
            ...state.posts,
            [post.id]: post,
          },
        }
      } else {
        return state
      }
    case SORT_BY_POSTS:
      return { ...state, sortBy: action.payload }
    default:
      return state
  }
}

export default posts
