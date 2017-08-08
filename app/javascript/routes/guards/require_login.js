import { getAccessToken } from '../../store/local_storage'

export default function(to, from, next) {
  if (getAccessToken()) {
    next()
  } else {
    next({ path: "/login" })
  }
}
