const baseURL = 'http://localhost:5001'

const headers = new Headers();
headers.append("Authorization", "react-app-123");

const getHeaders = { method: 'GET', headers: headers, 'Content-Type': 'application/json', };
// const postHeaders = { method: 'POST', headers: headers, 'Content-Type': 'application/json', };
// const putHeaders = { method: 'PUT', headers: headers, 'Content-Type': 'application/json', };
// const deleteHeaders = { method: 'DELETE', headers: headers, 'Content-Type': 'application/json', };

function getPosts(category = undefined) {
  let fetchURL = `${baseURL}`

  if (category !== undefined) {
    fetchURL = `${baseURL}/${category}`
  }

  return fetch(`${fetchURL}/posts`, getHeaders)
    .then(response => response.json())
    .then(posts => {
      const postsObject = {}

      for (let post of posts) {
        postsObject[post.id] = post
      }

      return postsObject
    })
}

function getCategories() {
  return fetch(`${baseURL}/categories`, getHeaders)
    .then(response => response.json())
    .then(categories => categories.categories)
}

function getPost(id) {
  return fetch(`${baseURL}/posts/${id}`, getHeaders)
    .then(response => response.json())
    .then(post => {
      return post
    })
}

export default {
  getPosts,
  getCategories,
  getPost
}