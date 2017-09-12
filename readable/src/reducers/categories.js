import { GET_CATEGORIES } from '../actions'

function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      const categories = action.payload.categories

      return categories
    default:
      return state
  }
}

export default categories
