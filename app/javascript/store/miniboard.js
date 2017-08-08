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

const resetBoardState = () => state = blankState()

const applyStateChange = (stateChange) => Object.assign(state, stateChange)

let state = blankState()

export {
  state,
  resetBoardState,
  applyStateChange,
}
