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

export type UserData = {
  userid: number
  username: string
  info: string | null
}

export const getAllUserRatings = () => service.get<UserRating[]>('/user/ratings')

export const getAllUsers = () => service.get<UserData[]>('/users')

export const addUser = (username: string) => service.put('/user', { username: username })
