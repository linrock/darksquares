import store from '../../store'

export default function(to, from, next) {
  if (store.getters.username) {
    next({ path: "/" })
  } else {
    next()
  }
}
