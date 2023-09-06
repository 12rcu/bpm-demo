<script setup lang="ts">
import type {ItemData} from '@/script/item/itemData'
import {ref} from 'vue'
import type {UserData, UserRating} from '@/script/user/userData'
import {getAllItems} from '@/script/item/itemData'
import {getAllUserRatings, getAllUsers} from '@/script/user/userData'
import {
  getUserRecommendations,
  getUserSimilarities
} from '@/script/recommender/userBasedRecommender'
import type {EstimatedRecommendations} from '@/script/recommender/userBasedRecommender'
import ItemRecommendationComponent from '@/components/recommender/ItemRecommendationComponent.vue'
import {getItemRecommendations, getItemSimilarities} from "@/script/recommender/itemBasedRecommender";

const items = ref<ItemData[]>([])
const users = ref<UserData[]>([])
const userRatings = ref<UserRating[]>([])

const activeUser = ref(0)
const activeItem = ref(0)
const userBaseEstimatedRatings = ref<EstimatedRecommendations>({})
const itemBaseEstimatedRatings = ref<EstimatedRecommendations>({})

const uSim = ref(new Map<number, number>)
const iSim = ref(new Map<number, number>)

const knn = ref(2)
const simMeasure = ref('pearson')
const weightedMean = ref(true)

function setActiveUser(id: number) {
  uSim.value.clear()

  getUserRecommendations(id, simMeasure.value, knn.value, weightedMean.value).then(
      (promise) => {
        console.log('Received user recommendations!')
        userBaseEstimatedRatings.value = promise.data
      },
      (err) => {
        console.log("couldn't load user recommendations: ")
        console.debug(err)
      }
  )

  getItemRecommendations(id, simMeasure.value, knn.value, weightedMean.value).then(
      (promise) => {
        console.log('Received item recommendations!')
        itemBaseEstimatedRatings.value = promise.data
      },
      (err) => {
        console.log("couldn't load item recommendations: ")
        console.debug(err)
      }
  )

  getUserSimilarities(id, simMeasure.value).then(
      (promise) => {
        promise.data.forEach((sim) => {
          if (!isNaN(sim.similarity)) {
            uSim.value.set(sim.userid, sim.similarity)
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
  iSim.value.clear()

  getItemSimilarities(id, simMeasure.value).then(
      (promise) => {
        promise.data.forEach((sim) => {
          if (!isNaN(sim.similarity)) {
            iSim.value.set(Number(sim.item), sim.similarity)
          }
        })
      },
      (err) => {
        console.debug('Failed to load all User Similarities:')
        console.debug(err)
      })

  activeUser.value = 0
  activeItem.value = id
}

const usernameWithSimilarity = (userid: number) => {
  return `${users.value.find((it) => it.userid == userid)?.username ?? 'error'} (${
      Math.round((uSim.value.get(userid) ?? Number.EPSILON) * 100) / 100
  })`
}

const itemNameWithSimilarity = (item: number) => {
  return `${items.value.find((it) => it.id == item)?.name ?? 'error'} (${
      Math.round((iSim.value.get(item) ?? Number.EPSILON) * 100) / 100
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
      userRatings.value = promise.data
    },
    (err) => {
      console.debug('Failed to load all User Ratings:')
      console.debug(err)
    }
)
</script>

<template>
  <div class="card table-card">
    <h3>Recommendation Parameters</h3>
    <div class="recommender_meta">
      <div class="input-bar">
        <select v-model="knn">
          <option value="1">knn 1</option>
          <option value="2">knn 2</option>
          <option value="3">knn 3</option>
          <option value="4">knn 4</option>
          <option value="5">knn 5</option>
        </select>
      </div>
      <div class="input-bar">
        <select v-model="simMeasure">
          <option value="pearson" selected="selected">Pearson/Adj Cosine</option>
          <option value="cosine">Cosine</option>
          <option value="euclid">Euclid</option>
        </select>
      </div>
      <div class="input-bar">
        Weighted Mean
        <input v-model="weightedMean" type="checkbox">
      </div>
    </div>
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
          {{ itemNameWithSimilarity(item.id) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="user in userRatings"
          v-bind:class="{ active: activeUser === user.userid }"
          v-bind:key="user.userid"
      >
        <td v-on:click="setActiveUser(user.userid)" style="cursor: pointer">
          {{ usernameWithSimilarity(user.userid) }}
        </td>
        <td v-for="item in items" v-bind:key="item.id">{{ user.ratings[item.id.toString()] }}</td>
      </tr>
      </tbody>
    </table>
    <div style="display: flex; gap: 5px">
      <ItemRecommendationComponent
          :items="items"
          v-if="activeUser !== 0"
          :user="activeUser"
          :recommended-items="userBaseEstimatedRatings"
          heading="User-based Recommendation"
      ></ItemRecommendationComponent>
      <ItemRecommendationComponent
          :items="items"
          v-if="activeUser !== 0"
          :user="activeUser"
          :recommended-items="itemBaseEstimatedRatings"
          heading="Item-based Recommendation"
      ></ItemRecommendationComponent>
    </div>
  </div>
</template>
