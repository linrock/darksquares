// For data that's meant to persist across sessions on the client

import store from 'store'

const ACCESS_TOKEN_KEY = `access_token`
const USERNAME_KEY = `username`

export const getAccessToken = () => store.get(ACCESS_TOKEN_KEY)
export const setAccessToken = token => store.set(ACCESS_TOKEN_KEY, token)

export const getUsername = () => store.get(USERNAME_KEY)
export const setUsername = username => store.set(USERNAME_KEY, username)
