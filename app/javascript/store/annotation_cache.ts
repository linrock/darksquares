import Annotation from '../models/annotation'

class AnnotationCache {
  public annotationsMap: Map<number, Annotation>

  constructor() {
    this.annotationsMap = new Map()
  }

  public add(annotation: Annotation) {
    this.annotationsMap.set(annotation.id, annotation)
  }

  public get(id: number): Annotation {
    return this.annotationsMap.get(id)
  }
}

export const annotationCache = new AnnotationCache()
