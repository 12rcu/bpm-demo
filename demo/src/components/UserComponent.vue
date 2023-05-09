<script setup lang="ts">
import { ref } from 'vue'
import { addUser } from '@/script/user/userData'

const username = ref('')

function addUsername() {
  if (username.value != '')
    addUser(username.value).then(
      () => {
        console.log('Added User!')
      },
      (err) => {
        console.debug('Failed to load all User Similarities:')
        console.debug(err)
      }
    )
}
</script>
<template>
  <div class="card">
    <h3>User</h3>
    <input v-model="username" type="text" placeholder="Username" />
    <button @click="addUsername()">Add User Name</button>
  </div>
</template>
