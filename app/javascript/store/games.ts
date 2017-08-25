import Game from '../models/game'
import {
  createGame,
  getGame,
  getGames,
  getMyGames
} from '../api/requests'

const gamesMap: Map<number, Game> = new Map()

const gameIdLists = {
  home: [],
  myGames: []
}

const saveGame = function(newGameData: any): Promise<Game> {
  return createGame(newGameData).then(response => {
    const game = new Game(response.data.game)
    gamesMap.set(game.id, game)
    return game
  })
}

const getOrFetchGame = function(id: number): Promise<Game> {
  let game = gamesMap.get(id)
  if (game) {
    return Promise.resolve(game)
  }
  return getGame(id).then(response => {
    game = new Game(response.data.game)
    gamesMap.set(id, game)
    return game
  })
}

const loadHomeGames = function(options: any = { page: 1 }): Promise<Array<number>> {
  return getGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    games.forEach(game => gamesMap.set(game.id, game))
    gameIdLists.home = Array.from(gamesMap.keys())
    return games.map(game => game.id)
  })
}

const loadMyGames = function(options: any = { page: 1 }): Promise<Array<number>> {
  return getMyGames(options.page).then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    games.forEach(game => gamesMap.set(game.id, game))
    gameIdLists.myGames = Array.from(gamesMap.keys())
    return games.map(game => game.id)
  })
}

export {
  loadHomeGames,
  loadMyGames,
  getOrFetchGame,
  gameIdLists,
  gamesMap,
  saveGame,
}
