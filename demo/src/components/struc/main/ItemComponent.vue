<script setup lang="ts">

import {addItem, delItem, editItem, getAllItems} from "@/script/item/itemData";
import type {ItemData} from '@/script/item/itemData'
import {ref} from "vue";

const items = ref<ItemData[]>([])
const inputName = ref('')
const inputDes = ref('')

function deletItem(id: number) {
  delItem(id).then(() => console.log('del item'), (e) => console.error(e))
}

function eItem(data: ItemData) {
  editItem(data).then(() => console.log('edit item'), (e) => console.error(e))
}

function aItem() {
  if(inputName.value.length > 0)
    addItem(inputName.value, inputDes.value).then(() => console.log('added item'), (e) => console.error(e))
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

</script>
<template>
  <div class="main-container">
    <div class="main-header anim" style="--delay: 0s">Items</div>
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
            v-for="item in items"
            v-bind:key="item.id"
        >
          <td>{{ item.id }}</td>
          <td class="table-input"><input v-model="item.name" type="text"></td>
          <td class="table-input"><input v-model="item.description" type="text" style="width: 100%"></td>
          <td><button @click="eItem(item)">Edit</button></td>
          <td><button  @click="deletItem(item.id)">Delete</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>Add Item</h3>
      <div style="display: flex; gap: 5px; align-content: center; vertical-align: center">
        Name
        <div class="input-bar">
          <input type="text" v-model="inputName">
        </div>
        Description
        <div class="input-bar">
          <input type="text" v-model="inputDes">
        </div>
        <button @click="aItem">Add</button>
      </div>
    </div>
  </div>
</template>
