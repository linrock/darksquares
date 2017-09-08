import * as Chess from 'chess.js'
import { groupBy, parseDate, timeAgo } from '../util'
import Move from './move'
import User from './user'
import { UserOptions } from './user'
import Annotation from './annotation'
import { AnnotationOptions } from './annotation'

const cjs = new Chess()

interface BoardState {
  fen: string
  score: string|number
  bestMove: string|object
  move: string
  highlights: Array<string>
}

export interface GameOptions {
  id: number
  user: UserOptions
  name: string
  pgn: string
  pgn_headers: object
  positions: Array<string>
  moves: Array<object>
  best_moves: Array<object>
  score: number
  graph_points: Array<Array<number>>
  annotations: Array<AnnotationOptions>
  created_at: string
  submitted_at: string
}

export default class Game {
  public id: number
  public user: User
  public name: string
  public pgn: string
  public pgnHeaders: object
  public positions: Array<string>
  public moves: Array<Move>
  public bestMoves: Array<object>
  public score: number
  public graphPoints: Array<Array<number>>
  public annotations: Array<Annotation> = []
  public createdAt: Date
  public submittedAt: Date

  private annotationMap: object = {}

  public static loadGamesFromData(gameData): Array<Game> {
    return gameData.map(data => new Game(data))
  }

  public constructor(options: GameOptions) {
    this.id = options.id
    if (options.user) {
      this.user = new User(options.user)
    }
    this.name = options.name
    this.pgn = options.pgn
    this.pgnHeaders = options.pgn_headers
    this.positions = options.positions
    if (options.moves) {
      this.moves = options.moves.map(move => new Move(move))
    }
    this.bestMoves = options.best_moves
    this.score = options.score
    this.graphPoints = options.graph_points
    if (options.annotations) {
      this.annotations = options.annotations.map(annotation => {
        return new Annotation(Object.assign({ game: this }, annotation))
      })
      this.computeAnnotationMap()
    }
    if (options.created_at) {
      this.createdAt = parseDate(options.created_at)
    }
    if (options.submitted_at) {
      this.submittedAt = parseDate(options.submitted_at)
    }
  }

  get path(): string {
    return `/games/${this.id}`
  }

  get key(): string {
    return `game-${this.id}`
  }

  get scores(): Array<number> {
    if (!this.graphPoints) return []
    return this.graphPoints[this.graphPoints.length - 1]
  }

  get nPoints(): number {
    if (!this.graphPoints) return 0
    return this.graphPoints[0].length
  }

  get username(): string {
    return this.user.username
  }

  get annotator(): string {
    const annotator = this.pgnHeaders["Annotator"]
    return annotator && annotator.match(/[\w\s]+/) ? annotator : null
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

  public stateAtPositionIndex(i: number): BoardState {
    const fen = this.positions[i]
    const state = <BoardState> {}
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
      if (this.bestMoves) {
        if (this.bestMoves[i] === null) {
          state.bestMove = "Game Over"
          state.score = ""
        } else {
          state.bestMove = this.bestMoves[i]
          state.score = score !== undefined ? score : ""
        }
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

  get createdAtTimeAgo(): string {
    return timeAgo(this.createdAt)
  }

  get submittedAtTimeAgo(): string {
    return timeAgo(this.submittedAt)
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
