import Annotation from '../models/annotation'
import {
  getUserAnnotations,
} from '../api/requests'

export const loadUserAnnotations =
  function(username: string, page: number): Promise<Array<Annotation>> {
    return getUserAnnotations(username, page).then(response => {
      return response.data.annotations.map(data => new Annotation(data))
    })
  }
