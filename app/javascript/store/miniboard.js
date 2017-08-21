const initialState = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  pgn: "",
  pgnHeaders: {},
  move: "",
  score: "",
  bestMove: "",
  highlights: [],
}

const blankState = () => Object.assign({}, initialState)

const resetBoardState = () => boardState = blankState()

const applyStateChange = (stateChange) => Object.assign(boardState, stateChange)

let boardState = blankState()

export {
  boardState,
  resetBoardState,
  applyStateChange,
}
