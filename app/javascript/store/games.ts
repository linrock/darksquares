import Game from '../models/game'
import { gameCache } from './game_cache'
import {
  createGame,
  getGame,
  getGames,
  getMyGames,
  getUserGames,
} from '../api/requests'
import store from './index'

export const saveGame = function(newGameData: any): Promise<Game> {
  return createGame(newGameData).then(response => {
    const game = new Game(response.data.game)
    gameCache.addGameToSet(`user-${game.username}`, game)
    return game
  })
}

export const getOrFetchGame = function(id: number): Promise<Game> {
  let game = gameCache.getGame(id)
  if (game) {
    return Promise.resolve(game)
  }
  return getGame(id).then(response => {
    game = new Game(response.data.game)
    gameCache.cacheGame(game)
    return game
  })
}

export const loadMyGames = function(options: any = { page: 1 }): Promise<number[]> {
  return getMyGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet('my_games', games)
    return games.map(game => game.id)
  })
}
