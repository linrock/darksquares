// For data that's meant to persist across sessions on the client

// import store from 'store'

const store = window.localStorage

const ACCESS_TOKEN_KEY = `access_token`
const USERNAME_KEY = `username`

export const getAccessToken = () => store.getItem(ACCESS_TOKEN_KEY)
export const setAccessToken = token => store.setItem(ACCESS_TOKEN_KEY, token)

export const getUsername = () => store.getItem(USERNAME_KEY)
export const setUsername = username => store.setItem(USERNAME_KEY, username)
