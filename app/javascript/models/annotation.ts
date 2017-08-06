interface AnnotationData {
  id: number
  username: string
  move_string: string
  text: string
}

export default class Annotation {
  id: number
  username: string
  move_string: string
  text: string

  public constructor(options: AnnotationData) {
    this.id = options.id
    this.username = options.username
    this.move_string = options.move_string
    this.text = options.text
  }
}
