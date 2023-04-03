import { Review } from '../model/review'

export const matchReviewsWithTimestamp = (reviews: Review[], queryTimestamp: string): Review | undefined => {
  const queryTime: number = new Date(queryTimestamp).getTime()
  let result: Review
  for (const review of reviews) {
    const reviewTime: number = new Date(review.timestamp).getTime()
    if (reviewTime <= queryTime) {
      if (!result) {
        result = review
      } else {
        const currentResultTime = new Date(result.timestamp).getTime()
        const distanceToCurrentResult = queryTime - currentResultTime
        const distanceToCandidateResult = queryTime - reviewTime
        if (distanceToCandidateResult < distanceToCurrentResult) {
          result = review
        }
      }
    }
  }
  return result
}
