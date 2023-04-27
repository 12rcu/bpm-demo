import service from '@/script/service'
import type { UserSimilarities } from '@/script/user/userData'

export const getUserSimilarities = (user: number, similarityMeasure: string = 'pearson') =>
  service.get<UserSimilarities>(
    `/userBased/similarities/${user}?SimilarityMeasure=${similarityMeasure}`
  )

export const getUserRecommendations = (
  user: number,
  similarityMeasure: string = 'pearson',
  knn: number = 2,
  weighted: boolean = true
) =>
  service.get<UserSimilarities>(
    `/userBased/recommendations/${user}?SimilarityMeasure=${similarityMeasure}&knn=${knn}&weightedMean=${weighted}`
  )
