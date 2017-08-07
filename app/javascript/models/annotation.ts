interface AnnotationData {
  id: number
  gameId: number
  username: string
  move_string: string
  text: string
}

export default class Annotation {
  id: number
  gameId: number
  username: string
  move_string: string
  text: string

  public constructor(options: AnnotationData) {
    this.id = options.id
    this.gameId = options.gameId
    this.username = options.username
    this.move_string = options.move_string
    this.text = options.text
  }
}
