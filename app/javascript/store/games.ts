import Game from '../models/game'
import {
  getGame,
  getGames
} from '../api/requests'

const gamesMap = {}

const getOrFetchGame = function(id): Promise<Game> {
  let game = gamesMap[id]
  if (game) {
    return Promise.resolve(game)
  }
  return getGame(id).then(response => {
    game = new Game(response.data)
    gamesMap[id] = game
    return game
  })
}

export {
  getOrFetchGame
}
