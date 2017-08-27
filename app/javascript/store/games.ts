import Game from '../models/game'
import GameCache from './game_cache'
import GameVoteCache from './game_vote_cache'
import {
  createGame,
  getGame,
  getGames,
  getMyGames,
  getUserGames,
} from '../api/requests'

export const gameCache = new GameCache()
export const gameVoteCache = new GameVoteCache()

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

export const loadHomeGames = function(page: number = 1): Promise<number[]> {
  return getGames(page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet('home', games)
    const gameVotes = response.data.game_votes
    if (gameVotes) {
      gameVotes.forEach(vote => gameVoteCache.setValue(vote.game_id, vote.value))
    }
    return games.map(game => game.id)
  })
}

export const loadMyGames = function(options: any = { page: 1 }): Promise<number[]> {
  return getMyGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet('my_games', games)
    return games.map(game => game.id)
  })
}

export const loadUserGames = function(options: any = { username: ``, page: 1 }): Promise<number[]> {
  return getUserGames(options.username, options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    gameCache.addGamesToSet(`user-${options.username}`, games)
    const gameVotes = response.data.game_votes
    if (gameVotes) {
      gameVotes.forEach(vote => gameVoteCache.setValue(vote.game_id, vote.value))
    }
    return games.map(game => game.id)
  })
}
