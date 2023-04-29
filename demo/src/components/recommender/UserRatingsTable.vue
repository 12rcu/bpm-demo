<script setup lang="ts">
import type { ItemData } from '@/script/item/itemData'
import { ref } from 'vue'
import type { UserRating } from '@/script/user/userData'
import { getAllItems } from '@/script/item/itemData'
import { getAllUserRatings } from '@/script/user/userData'

const items = ref<ItemData[]>([])
const userRatings = ref<UserRating[]>([])
const activeUser = ref(0)

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
  <table class="styled-table">
    <thead>
      <tr>
        <th>User</th>
        <th v-for="item in items" :key="item.id">{{ item.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userRatings" v-bind:class="{'active-row': activeUser == user.userid}">
        <td v-on:click="activeUser = user.userid" style="cursor: pointer;">{{ user.userid }}</td>
        <td v-for="item in items">{{ user.ratings[item.id.toString()] }}</td>
      </tr>
    </tbody>
  </table>
</template>
