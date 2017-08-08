const initialState = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  pgn: "",
  pgnHeaders: {},
  move: "",
  score: "",
  bestMove: "",
  annotations: "",
  highlights: [],
}

const blankState = () => Object.assign({}, initialState)

let state = blankState()

const resetBoardState = () => state = blankState()

export {
  state,
  resetBoardState
}
