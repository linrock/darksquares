import axios from 'axios'
import {
  getAccessToken,
  setAccessToken,
} from '../store/local_storage'

export default class APIClient {

  constructor() {
    this.createHttpClient(getAccessToken())
  }

  createHttpClient(accessToken) {
    setAccessToken(accessToken)
    const options = {}
    if (accessToken) {
      options.headers = {
        'Authorization': `Bearer ${accessToken}`
      }
    }
    this.httpClient = axios.create(options)
  }

  post() {
    return this.httpClient.post(...arguments)
  }

  get() {
    return this.httpClient.get(...arguments)
  }
}
