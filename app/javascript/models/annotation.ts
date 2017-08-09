import Game from './game'
import { timeAgo } from '../util'

interface AnnotationOptions {
  id: number
  game: Game
  username: string
  move_string: string
  created_at: string
  text: string
}

export default class Annotation {
  public id: number
  public game: Game
  public username: string
  public move_string: string
  public text: string
  public createdAt: string

  public constructor(options: AnnotationOptions) {
    this.id = options.id
    this.game = options.game
    this.username = options.username
    this.move_string = options.move_string
    this.text = options.text
    this.createdAt = options.created_at
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
      let i = Game.moveStringToPositionIndex(moveString)
      if (i === this.positionIndex) {
        moveStringMap[moveString] = this.game.getFenAfterMoveString(i - 1, moveString)
      } else if (i === this.positionIndex + 1) {
        moveStringMap[moveString] = this.game.getFenAfterMoveString(i, moveString)
      }
    })
    console.log(JSON.stringify(moveStringMap))
    return moveStringMap
  }

  public timeAgo(): string {
    return timeAgo(this.createdAt)
  }
}
