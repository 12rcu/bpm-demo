<script setup lang="ts">

import {getAllItems} from "@/script/item/itemData";
import type {UserData} from '@/script/user/userData'
import type {ItemData} from '@/script/item/itemData'
import {ref} from "vue";
import {addUser, delUser, editUser, getAllUsers} from "@/script/user/userData";
import RecommendComponent from "@/components/recommender/RecommendComponent.vue";

const users = ref<UserData[]>([])
const items = ref<ItemData[]>([])
const inputName = ref('')

function eUser(user: UserData) {
  editUser(user).then(() => console.log('edit user'), (e) => console.error(e))
}

function dUser(user: UserData) {
  delUser(user.userid).then(() => console.log('del user'), (e) => console.error(e))
}

function aUser() {
  addUser(inputName.value).then(() => console.log('add user'), (e) => console.error(e))
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
      console.debug('Failed to load all Users:')
      console.debug(err)
    }
)

</script>
<template>
  <div class="main-container">
    <div class="main-header anim" style="--delay: 0s">User</div>
    <div>
      <h3>Items</h3>
      <table>
        <thead>
        <tr style="text-align: left;">
          <th>ID</th>
          <th style="width: 5rem;">Name</th>
          <th style="width: 100%">Description</th>
          <th style="width: 1rem;">Edit</th>
          <th style="width: 1rem;">Delete</th>
        </tr>
        </thead>
        <tbody>
        <tr
            style="text-align: left;"
            v-for="user in users"
            v-bind:key="user.userid"
        >
          <td>{{ user.userid }}</td>
          <td class="table-input"><input v-model="user.username" type="text"></td>
          <td class="table-input"><input v-model="user.info" type="text" style="width: 100%"></td>
          <td><button @click="eUser(user)">Edit</button></td>
          <td><button  @click="dUser(user)">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>Add User</h3>
      <div style="display: flex; gap: 5px; align-content: center; vertical-align: center">
        Name
        <div class="input-bar">
          <input type="text" v-model="inputName">
        </div>
        <button @click="aUser">Add</button>
      </div>
    </div>
    <div>
      <RecommendComponent :items="items" :users="users"></RecommendComponent>
    </div>
  </div>
</template>
