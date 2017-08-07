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

let state = Object.assign({}, initialState)

const resetBoardState = () => state = Object.assign({}, initialState)

export {
  state,
  resetBoardState
}
