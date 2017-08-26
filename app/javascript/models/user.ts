import Game from './game'
import { GameOptions } from './game'
import Annotation from './annotation'
import { AnnotationOptions } from './annotation'
import { parseDate, timeAgo } from '../util'

const defaultUserOptions: UserOptions = {
  username: null,
  games: [],
  games_count: 0,
  annotations: [],
  annotations_count: 0
}

export interface UserOptions {
  username: string
  games?: Array<GameOptions>
  games_count?: number
  annotations?: Array<AnnotationOptions>
  annotations_count?: number
  created_at?: string
}

export default class User {
  public username: string
  public games: Array<Game>
  public gamesCount: number
  public annotations: Array<Annotation>
  public annotationsCount: number
  public createdAt: Date

  public constructor(options: UserOptions = defaultUserOptions) {
    this.username = options.username
    if (options.games) {
      this.games = options.games.map(data => new Game(data))
    }
    if (options.games_count) {
      this.gamesCount = options.games_count
    }
    if (options.annotations) {
      this.annotations = options.annotations.map(data => new Annotation(data))
    }
    if (options.annotations_count) {
      this.annotationsCount = options.annotations_count
    }
    if (options.created_at) {
      this.createdAt = parseDate(options.created_at)
    }
  }

  get memberSince(): string {
    return timeAgo(this.createdAt)
  }
}
