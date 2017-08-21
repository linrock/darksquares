import Game from './game'
import { GameOptions } from './game'
import Annotation from './annotation'
import { AnnotationOptions } from './annotation'
import { parseDate, timeAgo } from '../util'

const defaultUserOptions: UserOptions = {
  username: null,
  games: [],
  annotations: []
}

export interface UserOptions {
  username: string
  games?: Array<GameOptions>
  annotations?: Array<AnnotationOptions>
  created_at?: string
}

export default class User {
  public username: string
  public games: Array<Game>
  public annotations: Array<Annotation>
  public createdAt: Date

  public constructor(options: UserOptions = defaultUserOptions) {
    this.username = options.username
    if (options.games) {
      this.games = options.games.map(data => new Game(data))
    }
    if (options.annotations) {
      this.annotations = options.annotations.map(data => new Annotation(data))
    }
    if (options.created_at) {
      this.createdAt = parseDate(options.created_at)
    }
  }

  get memberSince(): string {
    return timeAgo(this.createdAt)
  }
}
