<script setup lang="ts">
import UserRatingsTable from '@/components/recommender/UserRatingsTable.vue'
import { ref } from 'vue'

const token = ref(localStorage.getItem('token') ?? '')
const inputToken = ref(localStorage.getItem('token') ?? '')

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
      <div class="card" v-if="hasLocalStorageToken()">
        <h3>User</h3>
        <form>
          <label for="user-name">Add new User</label><br />
          <input type="text" id="user-name" name="user-name" />
          <input type="submit" value="Add User Name" />
        </form>
      </div>
      <div class="card" v-if="hasLocalStorageToken()">
        <h3>Item</h3>
      </div>
      <div class="card" v-if="hasLocalStorageToken()">
        <h3>Recommendation</h3>
      </div>
    </div>
  </main>
</template>
