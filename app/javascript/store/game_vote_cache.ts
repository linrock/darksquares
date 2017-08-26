import GameVote from '../models/game_vote'

export default class GameVoteCache {
  public gameVoteMap: Map<number, number>

  constructor() {
    this.gameVoteMap = new Map()
  }

  public setValue(gameId: number, value: number): void {
    this.gameVoteMap.set(gameId, value)
  }

  public getValue(gameId: number, value: number): number {
    return this.gameVoteMap.get(gameId) || 0
  }
}
