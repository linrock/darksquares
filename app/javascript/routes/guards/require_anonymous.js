import {
  getAccessToken,
  getUsername,
} from '../../persistence/local_storage'

export default function(to, from, next) {
  if (getAccessToken() && getUsername()) {
    next({ path: "/" })
  } else {
    next()
  }
}
