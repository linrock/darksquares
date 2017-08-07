import { groupBy } from '../util'
import Move from './move'
import Annotation from './annotation'

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
  annotations: Array<any>
}

export default class Game {
  id: number
  meta: GameMeta
  pgn: string
  pgnHeaders: object
  positions: Array<string>
  moves: Array<Move>
  bestMoves: Array<object>
  graphPoints: Array<Array<number>>
  annotations: Array<Annotation>
  annotationMap: object

  public static loadGamesFromData(gameData): Array<Game> {
    return gameData.map(data => new Game(data))
  }

  public constructor(options: GameData) {
    this.id = options.id
    this.meta = options.meta
    this.pgn = options.pgn
    this.pgnHeaders = options.pgn_headers
    this.positions = options.positions
    this.moves = options.moves.map(move => new Move(move))
    this.bestMoves = options.best_moves
    this.graphPoints = options.graph_points
    this.annotations = options.annotations.map(annotation => {
      return new Annotation(
        (<any>Object).assign({ gameId: options.id }, annotation)
      )
    })
    this.computeAnnotationMap()
  }

  public addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation)
    this.computeAnnotationMap()
  }

  public removeAnnotation(annotation: Annotation) {
    this.annotations = this.annotations.filter(a => a.id !== annotation.id)
    this.computeAnnotationMap()
  }

  public annotationsAt(i): Array<Annotation> {
    return this.annotationMap[this.moveString(i)]
  }

  public moveString(i): string {
    return `${this.moveNum(i)} ${this.moves[i].san}`
  }

  public moveNum(i): string {
    return `${~~(i / 2 + 1)}.${i % 2 === 0 ? '' : '..'}`
  }

  private computeAnnotationMap(): void {
    this.annotationMap = groupBy(this.annotations, 'move_string')
    Object.keys(this.annotationMap).map((moveString, _i) => {
      const annotations = this.annotationMap[moveString]
      this.annotationMap[moveString] = annotations.sort((a,b) => a.id > b.id)
    })
  }
}
