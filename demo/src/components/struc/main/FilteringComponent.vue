<script setup lang="ts">
import {ref} from "vue";
import UserRatingsTable from "@/components/recommender/UserRatingsTable.vue";

const token = ref(localStorage.getItem('token') ?? '')
</script>
<template>
  <div class="main-container">
    <div class="main-header anim" style="--delay: 0s">Filtering</div>
    <div v-if="token == ''">
      Not authenticated, go to Authentication to load filtering!
    </div>
    <div v-if="token != ''">
      <UserRatingsTable></UserRatingsTable>
    </div>
  </div>
</template>
