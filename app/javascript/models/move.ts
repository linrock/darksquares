interface MoveData {
  san: string
}

export default class Move {
  san: string

  public constructor(options: any) {
    this.san = options.san
  }
}
