import service from '@/script/service'

export type UserSimilarity = {
  userid: number
  ratings: Map<number, number>
  similarity: number
}

export type UserRating = {
  userid: number
  ratings: Map<number, number>
}

export const getAllUserRatings = () => service.get<UserRating[]>('/user/ratings')
