import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  SET_USER,
  FETCH_USER_RECIPES,
  FETCH_TAGS,
  FETCH_ONE_RECIPE,
  UPDATE_RECIPE,
  ADD_RECIPE,
  DELETE_RECIPE,
  SEARCH_TERM,
  CREATE_LIST,
  SET_LIST,
  FETCH_USER_LISTS,
  FETCH_API_RECIPES,
  CLEAR_API,
  SET_RECIPE,
} from './types'

const ROOT_URL = 'http://localhost:3000/api/v1'

export function signinUser ({ email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/login`, { email, password })
    .then(response => {
      console.log('from server on login', response)
      dispatch({ type: AUTH_USER, id: response.data.id })
      console.log('setting jwt')
      localStorage.setItem('jwt', response.data.jwt)
      localStorage.setItem('id', response.data.id)
    })
  }
}

export function signupUser ({ name, email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { name, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER, id: response.data.id })
        localStorage.setItem('jwt', response.data.jwt)
        localStorage.setItem('id', response.data.id)
      })

  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('jwt')
  localStorage.removeItem('id')
  return { type: UNAUTH_USER }
}

export function fetchMessage () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/me`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
}

export const setUser = (userId) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/users/${userId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      console.log('setting user', response.data)
      dispatch({
        type: SET_USER,
        user: response.data
      })
    })
  }
}

export const updateUser = (user) => {
  return function (dispatch) {
    axios.put((`${ROOT_URL}/users/${user.id}`), {
      user: user,
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      dispatch({
        type: SET_USER,
        user: response.data
      })
    })
    .catch(error => false)
  }
}

export const fetchUserRecipes = (userId) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/users/${userId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      console.log('fetching user recipes', response.data)
      dispatch({
        type: FETCH_USER_RECIPES,
        payload: response.data.recipes
      })
    })
  }
}

export const searchTerm = (term) => {
  return {
    type: SEARCH_TERM,
    payload: term,
  }
}

export const fetchRecipe = (id) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/recipes/${id}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      console.log('fetching recipe', response.data)
      dispatch({
        type: FETCH_ONE_RECIPE,
        payload: response.data,
      })
    })
  }
}

export const setRecipe = (recipe) => {
  return {
    type: SET_RECIPE,
    recipe: recipe,
  }
}

export const createRecipe = ({recipe, user_id}) => {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/recipes`, { recipe, user_id })
    .then(response => {
      dispatch({
        type: ADD_RECIPE,
        payload: response.data,
      })
    })
    .catch(error => console.log(error.message))
  }
}

export const updateRecipe = (recipe) => {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/recipes/${recipe.id}`, {
      recipe,
      headers: { authorization: localStorage.getItem('jwt') },
    })
    .then(response => {
      dispatch({
        type: UPDATE_RECIPE,
        recipe: response.data.recipe,
      })
    })
  }
}

export const deleteRecipe = (recipeId) => {
  return function (dispatch) {
    axios.delete(`${ROOT_URL}/recipes/${recipeId}`, { params: { id: recipeId } })
    .then(response => dispatch({
      type: DELETE_RECIPE,
      payload: response.data,
    }))
  }
}

export const fetchTags = () => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/tags`, {
      headers: { authorization: localStorage.getItem('jwt') },
    })
    .then(response => {
      console.log('fetching tags', response.data)
      dispatch({
        type: FETCH_TAGS,
        payload: response.data
      })
    })
  }
}

export const fetchUserLists = (userId) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/users/${userId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      console.log('fetching user lists', response.data)
      dispatch({
        type: FETCH_USER_LISTS,
        payload: response.data.lists
      })
    })
  }
}

export const createList = (newList) => {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/lists`, newList)
    .then(response => {
      console.log('creating new list', response.data)
      dispatch({
        type: CREATE_LIST,
        payload: response.data,
      })
    })
  }
}

export const setLists = (lists) => {
  console.log('setting lists action')
  return {
    type: SET_LIST,
    payload: lists,
  }
}

export const fetchAPIRecipes = (query) => {
  const searchQuery = query.replace(' ', '%20')
  const API_KEY = '5f919a49ba17c91d6cc41c4cbb07ffb5'
  return function (dispatch) {
    axios.get(`https://community-food2fork.p.mashape.com/search?key=${API_KEY}&q=${searchQuery}`, {
      headers: {
        'X-Mashape-Key': 'GWwvmDTBc7mshNfEgeDqQnMKI0QUp1ymR5Tjsn5ju6XmN64hHM',
        accept: 'application/json',
      },
    })
    .then(response => {
      dispatch({
        type: FETCH_API_RECIPES,
        payload: response.data.recipes
      })
    })
  }
}

export const clearSearchAPI = () => {
  return {
    type: CLEAR_API,
  }
}
