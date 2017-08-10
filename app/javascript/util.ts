import * as moment from 'moment'

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const isElementInViewport = function(el): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const timeAgo = function(dateString: string): string {
  return `${moment(dateString).toNow(true)} ago`
}

export const flatten = function(list: Array<any>): Array<any> {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}
