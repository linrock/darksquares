interface MoveData {
  san: string
  from: string
  to: string
}

export default class Move {
  public san: string
  public from: string
  public to: string

  public constructor(options: any) {
    this.san = options.san
    this.from = options.from
    this.to = options.to
  }
}
