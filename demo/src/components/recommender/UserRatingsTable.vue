<script setup lang="ts">
import type { ItemData } from '@/script/item/itemData'
import { ref } from 'vue'
import type { UserSimilarity, UserData } from '@/script/user/userData'
import { getAllItems } from '@/script/item/itemData'
import { getAllUserRatings, getAllUsers } from '@/script/user/userData'
import {
  getUserRecommendations,
  getUserSimilarities
} from '@/script/recommender/userBasedRecommender'
import type { EstimatedRecommendations } from '@/script/recommender/userBasedRecommender'
import ItemRecommendationComponent from '@/components/recommender/ItemRecommendationComponent.vue'

const items = ref<ItemData[]>([])
const users = ref<UserData[]>([])
const userSimilarities = ref<UserSimilarity[]>([])
const activeUser = ref(0)
const activeItem = ref(0)
const estimatedRatings = ref<EstimatedRecommendations>({})

function setActiveUser(id: number) {
  const match = userSimilarities.value.find((it) => it.userid == id)
  if (match != undefined) {
    match.similarity = 1
  }

  getUserRecommendations(id).then(
    (promise) => {
      console.log('Received recommendations!')
      estimatedRatings.value = promise.data
    },
    (err) => {
      console.log("couldn't load user recommendations: ")
      console.debug(err)
    }
  )

  getUserSimilarities(id).then(
    (promise) => {
      promise.data.forEach((similarity) => {
        const match = userSimilarities.value.find((it) => it.userid == similarity.userid)
        if (match != undefined) {
          match.similarity = similarity.similarity
        }
      })
    },
    (err) => {
      console.debug('Failed to load all User Similarities:')
      console.debug(err)
    }
  )
  activeUser.value = id
  activeItem.value = 0
}

function setActiveItem(id: number) {
  activeUser.value = 0
  activeItem.value = id
}

const usernameWithSimilarity = (data: UserSimilarity) => {
  return `${users.value.find((it) => it.userid == data.userid)?.username ?? 'error'} (${
    Math.round((data.similarity + Number.EPSILON) * 100) / 100
  })`
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

getAllUsers().then(
  (promise) => {
    users.value = promise.data
  },
  (err) => {
    console.debug('Failed to load all users:')
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
  <div class="card table-card">
    <h3>User Ratings</h3>
    <table>
      <thead>
        <tr>
          <th style="padding-right: 5rem">User</th>
          <th
            v-for="item in items"
            :key="item.id"
            v-on:click="setActiveItem(item.id)"
            v-bind:class="{ active: activeItem === item.id }"
            style="cursor: pointer"
          >
            {{ item.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in userSimilarities"
          v-bind:class="{ active: activeUser === user.userid }"
          v-bind:key="user.userid"
        >
          <td v-on:click="setActiveUser(user.userid)" style="cursor: pointer">
            {{ usernameWithSimilarity(user) }}
          </td>
          <td v-for="item in items" v-bind:key="item.id">{{ user.ratings[item.id.toString()] }}</td>
        </tr>
      </tbody>
    </table>
    <ItemRecommendationComponent
      :items="items"
      v-if="activeUser !== 0"
      :user="activeUser"
     :recommended-items="estimatedRatings"></ItemRecommendationComponent>
  </div>
</template>
