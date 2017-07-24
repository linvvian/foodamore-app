import axios from 'axios'
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  SET_USER,
  FETCH_USER,
  FETCH_USER_RECIPES,
  FETCH_TAGS,
  FETCH_ONE_RECIPE,
  UPDATE_RECIPE,
} from './types'

const ROOT_URL = 'http://localhost:3000/api/v1'

export function signinUser ({ email, password }) {
  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`, { email, password })
    .then(response => {
      // If request is good...
      // - Update state to indicate user is authenticated
      console.log('from server on login', response)
      dispatch({ type: AUTH_USER, id: response.data.id })
      // - Save the JWT token
      console.log('setting jwt')
      localStorage.setItem('jwt', response.data.jwt)
    })
  }
}

export function signupUser ({ name, email, password }) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { name, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER, id: response.data.id })
        localStorage.setItem('jwt', response.data.jwt)
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

export const fetchUser = (userId) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/users/${userId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      dispatch({
        type: FETCH_USER,
        payload: response.data
      })
    })
  }
}

export const fetchUserRecipes = (userId) => {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/users/${userId}`, {
      headers: { authorization: localStorage.getItem('jwt') }
    })
    .then(response => {
      dispatch({
        type: FETCH_USER_RECIPES,
        payload: response.data.recipes
      })
    })
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

export const updateRecipe = (recipe) => {
  return function (dispatch) {
    axios.put(`${ROOT_URL}/recipes/${recipe.id}`, {
      recipe,
      headers: { authorization: localStorage.getItem('jwt') },
    })
    .then(response => {
      dispatch({
        type: UPDATE_RECIPE,
        recipe: response.data,
      })
    })
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
