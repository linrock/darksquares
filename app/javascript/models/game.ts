interface GameMeta {
  name: string
  submitter: string
}

interface GameData {
  id: number
  meta: GameMeta
  pgn: string
  pgn_headers: object
  positions: Array<string>
  moves: Array<object>
  best_moves: Array<object>
  graph_points: Array<Array<number>>
  annotations: Array<null|Array<string>>
}

export default class Game {
  id: number
  meta: GameMeta
  pgn: string
  pgnHeaders: object
  positions: Array<string>
  moves: Array<object>
  bestMoves: Array<object>
  graphPoints: Array<Array<number>>
  annotations: Array<null|Array<string>>

  public static loadGamesFromData(gameData): Array<Game> {
    return gameData.map(data => new Game(data))
  }

  public constructor(options: GameData) {
    this.id = options.id
    this.meta = options.meta
    this.pgn = options.pgn
    this.pgnHeaders = options.pgn_headers
    this.positions = options.positions
    this.moves = options.moves
    this.bestMoves = options.best_moves
    this.graphPoints = options.graph_points
    this.annotations = options.annotations
  }
}
