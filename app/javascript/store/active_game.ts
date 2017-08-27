class ActiveGame {
  public key: string = null

  public setKey(key: string) {
    this.key = key
  }
}

export const activeGame = new ActiveGame()
