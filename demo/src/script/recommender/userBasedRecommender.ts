import service from '@/script/service'
import type { UserSimilarity } from '@/script/user/userData'

export const getUserSimilarities = (user: number, similarityMeasure: string = 'pearson') =>
  service.get<UserSimilarity>(
    `/userBased/similarities/${user}?SimilarityMeasure=${similarityMeasure}`
  )

export const getUserRecommendations = (
  user: number,
  similarityMeasure: string = 'pearson',
  knn: number = 2,
  weighted: boolean = true
) =>
  service.get<UserSimilarity>(
    `/userBased/recommendations/${user}?SimilarityMeasure=${similarityMeasure}&knn=${knn}&weightedMean=${weighted}`
  )
