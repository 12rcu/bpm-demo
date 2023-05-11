<script setup lang="ts">
import { ref } from 'vue'
import { addItem } from '@/script/item/itemData'

const itemName = ref('')

function addItemObj() {
  if (itemName.value != '')
    addItem(itemName.value, '').then(
      () => {
        console.log('Added Item!')
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
    <h3>Item</h3>
    <input v-model="itemName" type="text" placeholder="Item Name" />
    <button @click="addItemObj()">Add Item Name</button>
  </div>
</template>
