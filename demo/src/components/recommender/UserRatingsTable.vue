<script setup lang="ts">
import type { ItemData } from '@/script/item/itemData'
import { ref } from 'vue'
import type { UserRating } from '@/script/user/userData'
import { getAllItems } from '@/script/item/itemData'
import { getAllUserRatings } from '@/script/user/userData'

const items = ref<ItemData[]>()
const userRatings = ref<UserRating[]>()

getAllItems().then(
  (promise) => {
    items.value = promise.data
  },
  (err) => {
    console.debug('Failed to load all Items:')
    console.debug(err)
  }
)

getAllUserRatings().then(
  (promise) => {
    userRatings.value = promise.data
  },
  (err) => {
    console.debug('Failed to load all User Ratings:')
    console.debug(err)
  }
)
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th v-for="(name, _, id) in items" :key="id">{{ name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(userid, ratings) in userRatings">
        <td>{{ userid }}</td>
        <td v-for="(_, _, itemId) in items">{{ ratings[itemId.toString()] }}</td>
      </tr>
    </tbody>
  </table>
</template>
