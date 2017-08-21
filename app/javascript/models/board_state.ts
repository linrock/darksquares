import Move from './move'

export default interface BoardState {
  fen: string
  score: string|number
  bestMove: string|object
  move: string
  highlights: Array<string>
}
