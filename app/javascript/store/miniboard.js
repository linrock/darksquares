const initialBoardState = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  pgn: "",
  pgnHeaders: {},
  move: "",
  score: "",
  bestMove: "",
  highlights: [],
}

const blankState = () => Object.assign({}, initialBoardState)

const resetBoardState = () => boardState = blankState()

const applyStateChange = (stateChange) => Object.assign(boardState, stateChange)

const showGamePosition = (game, i, updatePgnHeaders = false) => {
  if (updatePgnHeaders) {
    applyStateChange(
      Object.assign(
        { pgnHeaders: game.pgnHeaders },
        game.stateAtPositionIndex(i)
      )
    )
  } else {
    applyStateChange(game.stateAtPositionIndex(i))
  }
}

let boardState = blankState()

export {
  boardState,
  resetBoardState,
  showGamePosition,
}
