import service from '@/script/service'

export type ItemData = {
  name: string
  description: string
  id: number
}

export type ItemSimilarity = {
  item: string
  similarity: number
}

export const getAllItems = () => service.get<ItemData[]>('/items')

export const addItem = (name: string, description: string) =>
  service.put('/item', { name: name, description: description })

export const delItem = (id: number) => service.delete(`/item/${id}`)

export const editItem = (data: ItemData) => service.post('/item', data)