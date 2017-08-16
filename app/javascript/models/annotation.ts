import Game from './game'
import { flatten, parseDate, timeAgo } from '../util'

interface AnnotationOptions {
  id: number
  game_id: number
  game: Game
  fen: string
  username: string
  move: object
  move_string: string
  created_at: string
  text: string
}

export default class Annotation {
  public id: number
  public gameId: number
  public game: Game
  public fen: string
  public username: string
  public move: object
  public move_string: string
  public text: string
  public createdAt: Date

  public constructor(options: AnnotationOptions) {
    this.id = options.id
    this.gameId = options.game_id
    this.game = options.game
    this.fen = options.fen
    this.username = options.username
    this.move = options.move
    this.move_string = options.move_string
    this.text = options.text
    this.createdAt = parseDate(options.created_at)
  }

  get positionIndex(): number {
    return Game.moveStringToPositionIndex(this.move_string)
  }

  public findMoveStrings(): Array<string> {
    return this.text.match(/\d\.(\.\.)?\s?\w\w?\d/g) || []
  }

  // Find valid positions from move strings in the annotation text
  //
  public mapMoveStringsToPositions(): Map<string, string> {
    const moveStringMap = new Map()
    this.findMoveStrings().forEach(moveString => {
      const i = Game.moveStringToPositionIndex(moveString)
      const newFen = this.game.getFenAfterMoveString(i - 1, moveString)
      if (newFen) {
        moveStringMap[moveString] = newFen
      }
    })
    console.log(JSON.stringify(moveStringMap))
    return moveStringMap
  }

  get fragments(): Array<string|object> {
    let textArray = [this.text]
    const map = this.mapMoveStringsToPositions()
    Object.keys(map).forEach(moveString => {
      const temp = textArray.map(element => {
        if (typeof element === "string") {
          const tmp2 = []
          const fragments = element.split(moveString)
          fragments.forEach(fragment => {
            tmp2.push(fragment)
            tmp2.push({
              text: moveString,
              fen: map[moveString],
            })
          })
          return tmp2.slice(0, -1)
        } else {
          return element
        }
      })
      textArray = flatten(temp)
    })
    return textArray
  }

  public timeAgo(): string {
    return timeAgo(this.createdAt)
  }
}
