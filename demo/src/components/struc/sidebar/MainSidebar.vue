<script setup lang="ts">
import {onBeforeUnmount, onMounted} from "vue";
import SidebarWrapper from "@/components/struc/sidebar/SidebarWrapper.vue";

let isLargeScreen = window.innerWidth > 1090
function handleResize() {
  isLargeScreen = window.innerWidth > 1090;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
})
</script>

<template>
  <div class="sidebar">
    <a class="logo-expand" href="#">Dashboard</a>
    <SidebarWrapper></SidebarWrapper>
  </div>
</template>
