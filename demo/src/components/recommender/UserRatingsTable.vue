<script setup lang="ts">
import type { ItemData } from '@/script/item/itemData'
import { ref } from 'vue'
import type { UserSimilarity } from '@/script/user/userData'
import { getAllItems } from '@/script/item/itemData'
import { getAllUserRatings } from '@/script/user/userData'

const items = ref<ItemData[]>([])
const userSimilarities = ref<UserSimilarity[]>([])
const activeUser = ref(0)
const activeItem = ref(0)

function setActiveUser(id: number) {
  activeUser.value = id
  activeItem.value = 0
}

function setActiveItem(id: number) {
  activeUser.value = 0
  activeItem.value = id
}

const usernameWithSimilarity = (data: UserSimilarity) => {
    if(data.similarity == 0) {
        return data.userid.toString()
    } else {
        return `${data.userid} (${Math.round((data.similarity + Number.EPSILON) * 100) / 100})`
    }
}

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
    userSimilarities.value = promise.data.map((o) => ({
      userid: o.userid,
      ratings: o.ratings,
      similarity: 0
    }))
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
        <th
          v-for="item in items"
          :key="item.id"
          v-on:click="setActiveItem(item.id)"
          v-bind:class="{ 'active-col': activeItem == item.id }"
        >
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in userSimilarities"
        v-bind:class="{ 'active-row': activeUser == user.userid }"
      >
        <td v-on:click="setActiveUser(user.userid)" style="cursor: pointer">{{ usernameWithSimilarity(user) }}</td>
        <td v-for="item in items">{{ user.ratings[item.id.toString()] }}</td>
      </tr>
    </tbody>
  </table>
</template>
