<script setup lang="ts">
import UserRatingsTable from '@/components/recommender/UserRatingsTable.vue'
import { ref } from 'vue'
import RecommendComponent from '@/components/recommender/RecommendComponent.vue'
import { getAllItems } from '@/script/item/itemData'
import type { ItemData } from '@/script/item/itemData'
import type { UserData } from '@/script/user/userData'
import { getAllUsers } from '@/script/user/userData'
import UserComponent from '@/components/UserComponent.vue'
import ItemComponent from '@/components/ItemComponent.vue'

const token = ref(localStorage.getItem('token') ?? '')
const inputToken = ref(localStorage.getItem('token') ?? '')

const items = ref<ItemData[]>([])
const users = ref<UserData[]>([])

getAllItems().then(
  (promise) => {
    items.value = promise.data
  },
  (err) => {
    console.log('Failed to load Items:')
    console.debug(err)
  }
)

getAllUsers().then(
  (promise) => {
    users.value = promise.data
  },
  (err) => {
    console.log('Failed to load Users:')
    console.debug(err)
  }
)

function hasLocalStorageToken() {
  return token.value !== ''
}

function save() {
  localStorage.setItem('token', inputToken.value)
  token.value = inputToken.value
}
</script>

<template>
  <header>
    <h1>BPMN Demo</h1>
  </header>

  <main>
    <div id="cards">
      <div class="card auth-card">
        <h3>Authentication</h3>
        <input v-model="inputToken" type="text" placeholder="Access Token" />
        <button @click="save()">Save & Load</button>
      </div>

      <UserRatingsTable v-if="hasLocalStorageToken()"></UserRatingsTable>
      <UserComponent v-if="hasLocalStorageToken()"></UserComponent>
      <ItemComponent v-if="hasLocalStorageToken()"></ItemComponent>
      <RecommendComponent
        :items="items"
        :users="users"
        v-if="hasLocalStorageToken()"
      ></RecommendComponent>
    </div>
  </main>
</template>
