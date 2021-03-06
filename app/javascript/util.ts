import { parse, distanceInWordsToNow }  from 'date-fns'

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const isElementInViewport = function(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const parseDate = function(dateString: string): Date {
  return parse(dateString)
}

export const timeAgo = function(date: Date): string {
  return `${distanceInWordsToNow(date)} ago`
}

export const flatten = function(list: Array<any>): Array<any> {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), [])
}
