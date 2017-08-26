import Game from '../models/game'

export default class GameCache {
  public gamesMap: Map<number, Game>
  public gameIdSet: Map<string, Set<number>>
  public games: Map<string, Object>

  constructor() {
    this.gamesMap = new Map()
    this.gameIdSet = new Map()
    this.games = new Map()
  }

  public addGameToSet(name: string, game: Game) {
    this.initializeCache(name)
    this.cacheGame(game)
    this.gameIdSet.get(name).add(game.id)
    this.games[name].games = Array.from(this.gameIdSet.get(name)).map(id => {
      return this.gamesMap.get(id)
    })
  }

  public addGamesToSet(name: string, games: Array<Game>): void {
    games.forEach(game => this.addGameToSet(name, game))
  }

  public getGamesFromSet(name: string): Array<Game> {
    return Array.from(this.gameIdSet.get(name) || []).map(id => this.gamesMap.get(id))
  }

  public getGameSource(name: string): any {
    this.initializeCache(name)
    return this.games[name]
  }

  public cacheGame(game: Game) {
    this.gamesMap.set(game.id, game)
  }

  public getGame(id: number): Game {
    return this.gamesMap.get(id)
  }

  public removeGame(id: number) {
    this.gamesMap.delete(id)
    // this.gameIdSet.delete(id)
  }

  private initializeCache(name: string) {
    let games = this.games[name]
    if (!games) {
      this.gameIdSet.set(name, new Set())
      this.games[name] = { games: [] }
    }
  }
}
