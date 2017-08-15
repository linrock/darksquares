import Game from './game'
import Annotation from './annotation'

export default class User {
  public username: string
  public activity: Array<Game|Annotation>
  public games: Array<Game>
  public annotations: Array<Annotation>

  public constructor(options: any = {
    games: [],
    annotations: []
  }) {
    this.username = options.username
    this.games = options.games.map(data => new Game(data))
    this.annotations = options.annotations.map(data => new Annotation(data))
  }
}
