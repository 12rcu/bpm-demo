<script setup lang="ts">
import { ref } from 'vue'
import type { UserData } from '@/script/user/userData'
import type { ItemData } from '@/script/item/itemData'
import { addRating } from '@/script/recommender/basicRecommend'

interface Props {
  users: UserData[]
  items: ItemData[]
}

defineProps<Props>()

const selUserid = ref(0)
const selItemId = ref(0)
const rating = ref(1)

function addRatingBtn() {
  console.debug('here:', selUserid.value, selItemId.value)
  if (selUserid.value > 0 && selItemId.value > 0) {
    addRating(selUserid.value, selItemId.value, rating.value).then(
      () => console.log('Added rating'),
      (err) => {
        console.log('Failed to add Rating:')
        console.debug(err)
      }
    )
  }
}
</script>
<template>
  <div class="card">
    <h3>Recommend</h3>
    <select v-model="selUserid">
      <option v-for="user in users" :value="user.userid">{{ user.username }}</option>
    </select>
    <select v-model="selItemId">
      <option v-for="item in items" :value="item.id">{{ item.name }}</option>
    </select>
    <input v-model="rating" type="number" placeholder="Rating" />
    <button @click="addRatingBtn()">Add Rating</button>
  </div>
</template>
