<script lang="ts" setup>
import type { ItemData } from '@/script/item/itemData'
import type { EstimatedRecommendations } from '@/script/recommender/userBasedRecommender'

interface Props {
  items: ItemData[]
  recommendedItems: EstimatedRecommendations
  user: number
}

const props = defineProps<Props>()

function getItemName(item: any) {
  return props.items.find((it) => it.id === Number(item))
}
</script>
<template>
  <div>
    <h5>Recommended</h5>
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
