import service from '@/script/service'
import type {EstimatedRecommendations} from "@/script/recommender/userBasedRecommender";
import type {ItemSimilarity} from "@/script/item/itemData";

export const getItemSimilarities = (item: number, similarityMeasure: string = 'pearson') =>
  service.get<ItemSimilarity[]>(
    `/itemBased/similarities/${item}?SimilarityMeasure=${similarityMeasure}`
  )

export const getItemRecommendations = (
  user: number,
  similarityMeasure: string = 'pearson',
  knn: number = 2,
  weighted: boolean = true
) =>
  service.get<EstimatedRecommendations>(
    `/itemBased/recommendations/${user}?SimilarityMeasure=${similarityMeasure}&knn=${knn}&weightedMean=${weighted}`
  )
