import Game from '../models/game'
import GameCache from './game_cache'
import {
  createGame,
  getGame,
  getGames,
  getMyGames,
  getUserGames,
} from '../api/requests'

export const gameCache = new GameCache()

export const saveGame = function(newGameData: any): Promise<Game> {
  return createGame(newGameData).then(response => {
    const game = new Game(response.data.game)
    gameCache.cacheGame(game)
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

export const loadHomeGames = function(options: any = { page: 1 }): Promise<Array<number>> {
  return getGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet('home', games)
    return games.map(game => game.id)
  })
}

export const loadMyGames = function(options: any = { page: 1 }): Promise<Array<number>> {
  return getMyGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet('my_games', games)
    return games.map(game => game.id)
  })
}

export const loadUserGames = function(options: any = { username: ``, page: 1 }): Promise<Array<number>> {
  return getUserGames(options.username, options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet(`user-${options.username}`, games)
    console.log('adding games to set')
    return games.map(game => game.id)
  })
}
