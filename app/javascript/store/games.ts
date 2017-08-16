import Game from '../models/game'
import {
  getGame,
  getGames,
  getMyGames
} from '../api/requests'

const gamesMap: Map<number, Game> = new Map()

const gameIdLists = {
  home: [],
  myGames: []
}

const getOrFetchGame = function(id: number): Promise<Game> {
  let game = gamesMap[id]
  if (game) {
    return Promise.resolve(game)
  }
  return getGame(id).then(response => {
    game = new Game(response.data.game)
    gamesMap[id] = game
    return game
  })
}

const loadHomeGames = function() {
  if (gameIdLists.home.length) {
    return
  }
  getGames().then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    games.forEach(game => gamesMap[game.id] = game)
    gameIdLists.home = games.map(game => game.id)
  })
}

const loadMyGames = function() {
  if (gameIdLists.myGames.length) {
    return
  }
  getMyGames().then(response => {
    const games = Game.loadGamesFromData(response.data.games)
    games.forEach(game => gamesMap[game.id] = game)
    gameIdLists.myGames = games.map(game => game.id)
  })
}

export {
  loadHomeGames,
  loadMyGames,
  getOrFetchGame,
  gameIdLists,
  gamesMap,
}