import service from '@/script/service'

export type UserSimilarities = {
  userid: number
  ratings: Map<string, number>
  similarity: number
}

export type UserRating = {
  userid: number
  ratings: Map<string, number>
}

export const getAllUserRatings = () => service.get<UserRating[]>('/user/ratings')
