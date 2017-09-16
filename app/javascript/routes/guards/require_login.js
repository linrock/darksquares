import store from '../../store'

export default function(to, from, next) {
  if (store.getters.username) {
    next()
  } else {
    next({ path: "/sign_up" })
  }
}
