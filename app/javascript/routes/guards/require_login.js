import { getAccessToken } from '../../persistence/local_storage'

export default function(to, from, next) {
  if (getAccessToken()) {
    next()
  } else {
    next({ path: "/sign_up" })
  }
}
