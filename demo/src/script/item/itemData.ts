import service from '@/script/service'

export type ItemData = {
  name: string
  description: string
  id: number
}

export const getAllItems = () => service.get<ItemData[]>('/items')
