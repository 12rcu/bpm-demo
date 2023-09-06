<script lang="ts" setup>
import type { ItemData } from '@/script/item/itemData'
import type { EstimatedRecommendations } from '@/script/recommender/userBasedRecommender'

interface Props {
  items: ItemData[]
  recommendedItems: EstimatedRecommendations
  user: number
  heading: string
}

const props = defineProps<Props>()

function getItemName(item: any) {
  return props.items.find((it) => it.id === Number(item)) ?? 'undefined'
}
</script>
<template>
  <div>
    <h3>{{ props.heading }}</h3>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Estimated Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(estRating, item) in recommendedItems" v-bind:key="item">
          <td>{{ getItemName(item).name }}</td>
          <td>{{ estRating }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
