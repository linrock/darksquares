import * as Chess from 'chess.js'
import { groupBy, parseDate, timeAgo } from '../util'
import Move from './move'
import Annotation from './annotation'

const cjs = new Chess()

interface GameMetadataOptions {
  name: string
  submitter: string
  submitted_at: string
}

class GameMetadata {
  public name: string
  public submitter: string
  public submittedAt: Date

  public constructor(options: GameMetadataOptions) {
    this.name = options.name
    this.submitter = options.submitter
    this.submittedAt = parseDate(options.submitted_at)
  }

  get timeAgo(): string {
    return timeAgo(this.submittedAt)
  }
}

export interface GameOptions {
  id: number
  metadata: GameMetadataOptions
  pgn: string
  pgn_headers: object
  positions: Array<string>
  moves: Array<object>
  best_moves: Array<object>
  graph_points: Array<Array<number>>
  annotations: Array<any>
  created_at: string
}

export default class Game {
  public id: number
  public metadata: GameMetadata
  public pgn: string
  public pgnHeaders: object
  public positions: Array<string>
  public moves: Array<Move>
  public bestMoves: Array<object>
  public graphPoints: Array<Array<number>>
  public annotations: Array<Annotation>
  public createdAt: Date

  private annotationMap: object

  public static loadGamesFromData(gameData): Array<Game> {
    return gameData.map(data => new Game(data))
  }

  public constructor(options: GameOptions) {
    this.id = options.id
    if (options.metadata) {
      this.metadata = new GameMetadata(options.metadata)
    }
    this.pgn = options.pgn
    this.pgnHeaders = options.pgn_headers
    this.positions = options.positions
    if (options.moves) {
      this.moves = options.moves.map(move => new Move(move))
    }
    this.bestMoves = options.best_moves
    this.graphPoints = options.graph_points
    if (options.annotations) {
      this.annotations = options.annotations.map(annotation => {
        return new Annotation(
          (<any>Object).assign({ game: this }, annotation)
        )
      })
      this.computeAnnotationMap()
    }
    if (options.created_at) {
      this.createdAt = parseDate(options.created_at)
    }
  }

  get path(): string {
    return `/games/${this.id}`
  }

  get scores(): Array<number> {
    if (!this.graphPoints) return []
    return this.graphPoints[this.graphPoints.length - 1]
  }

  get nPoints(): number {
    if (!this.graphPoints) return 0
    return this.graphPoints[0].length
  }

  // annotations

  public addAnnotation(annotation: Annotation): void {
    this.annotations.push(annotation)
    this.computeAnnotationMap()
  }

  public removeAnnotation(annotation: Annotation): void {
    this.annotations = this.annotations.filter(a => a.id !== annotation.id)
    this.computeAnnotationMap()
  }

  public annotationsAt(i: number): Array<Annotation> {
    return this.annotationMap[this.moveString(i)]
  }

  // moves

  public moveString(i: number): string {
    return `${this.moveNum(i)} ${this.moves[i].san}`
  }

  public moveNum(i: number): string {
    return `${~~(i / 2 + 1)}.${i % 2 === 0 ? '' : '..'}`
  }

  public stateAtPositionIndex(i: number): object {
    const fen = this.positions[i]
    const state = <any>{}
    if (fen) {
      state.fen = fen
    }
    if (i === 0) {
      state.score = ""
      state.bestMove = ""
      state.move = ""
      state.highlights = []
    } else {
      const score = this.scores[i]
      if (score !== undefined) {
        state.score = score
      }
      if (this.bestMoves && this.bestMoves[i]) {
        state.bestMove = this.bestMoves[i]
      }
      const j = i - 1
      const move = this.moves[j]
      if (move) {
        state.move = this.moveString(j)
        state.highlights = [move.from, move.to]
      } else {
        state.move = ``
        state.highlights = []
      }
    }
    return state
  }

  // positions

  public getFenAfterMoveString(i: number, moveString: string): string {
    cjs.load(this.positions[i])
    const move = cjs.move(moveString.replace(/\d\.+\s*/, ''))
    if (move) {
      return cjs.fen()
    }
  }

  public static moveStringToPositionIndex(moveString: string): number {
    return parseInt(moveString) * 2 - (moveString.indexOf("...") > 0 ? 0 : 1)
  }

  private computeAnnotationMap(): void {
    this.annotationMap = groupBy(this.annotations, 'move_string')
    Object.keys(this.annotationMap).map((moveString, _i) => {
      const annotations = this.annotationMap[moveString]
      this.annotationMap[moveString] = annotations.sort((a,b) => a.id > b.id)
    })
  }
}
