import * as moment from 'moment'

interface AnnotationData {
  id: number
  gameId: number
  username: string
  move_string: string
  created_at: string
  text: string
}

export default class Annotation {
  id: number
  gameId: number
  username: string
  move_string: string
  text: string
  createdAt: string

  public constructor(options: AnnotationData) {
    this.id = options.id
    this.gameId = options.gameId
    this.username = options.username
    this.move_string = options.move_string
    this.text = options.text
    this.createdAt = options.created_at
  }

  public timeAgo(): string {
    return `${moment(this.createdAt).toNow(true)} ago`
  }
}
