import service from '@/script/service'

export type ItemData = {
  name: string
  description: string
  id: number
}

export const getAllItems = () => service.get<ItemData[]>('/items')

export const addItem = (name: string, description: string) =>
  service.put('/item', { name: name, description: description })
