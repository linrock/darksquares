interface GameVoteOptions {
  game_id: number
  value: number
}

export default class GameVote {
  public gameId: number
  public value: number

  public constructor(options: GameVoteOptions) {
    this.gameId = options.game_id
    this.value = options.value
  }
}
