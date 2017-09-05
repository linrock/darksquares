import Annotation from '../models/annotation'
import {
  getUserAnnotations,
} from '../api/requests'

export const loadUserAnnotations = function(username: string, page: number): Promise<any> {
  return getUserAnnotations(username, page).then(response => {
    return {
      results: response.data.annotations.map(data => new Annotation(data)),
      moreResults: response.data.more_results
    }
  })
}
