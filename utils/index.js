import { format } from 'timeago.js'

export function timeAgo (t) {
  const diff = new Date() - t
  const diffSeconds = Math.round(diff / 1000)
  if (diffSeconds > 10) {
    return format(t)
  }
  if (diffSeconds < 1) {
    return 'just now'
  }
  return diffSeconds + ' seconds ago'
}
