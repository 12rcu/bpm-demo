import service from '@/script/service'

export const addRating = (userid: number, itemId: number, rating: number) =>
  service.post('/user/rating', { userid: userid, ratings: { [itemId]: rating } })
