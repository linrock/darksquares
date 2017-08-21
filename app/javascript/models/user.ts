import Game from './game'
import Annotation from './annotation'

const defaultUserOptions = {
  games: [],
  annotations: []
}

interface UserOptions {
  username: string
  games?: Array<Game>
  annotations?: Array<Annotation>
}

export default class User {
  public username: string
  public games: Array<Game>
  public annotations: Array<Annotation>

  public constructor(options: UserOptions = defaultUserOptions) {
    this.username = options.username
    if (options.games) {
      this.games = options.games.map(data => new Game(data))
    }
    if (options.annotations) {
      this.annotations = options.annotations.map(data => new Annotation(data))
    }
  }
}
