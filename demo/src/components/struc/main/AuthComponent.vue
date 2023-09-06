<script setup lang="ts">
import {ref} from "vue";

const inputToken = ref(localStorage.getItem('token') ?? '') //reference when the user is typing (text field)

function save() {
  localStorage.setItem('token', inputToken.value)
}
</script>

<template>
  <div class="main-container">
    <div class="main-header anim" style="--delay: 0s">Authentication</div>
    <div class="input-auth-bar">
      <input v-model="inputToken" type="text" placeholder="Access Token">
      <a @click="save()" class="auth-check">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="34px" height="34px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"/><stop offset="1" stop-color="#50d18d"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"/><stop offset=".931" stop-color="#125933"/><stop offset="1" stop-color="#11522f"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
      </a>
    </div>
  </div>
</template>
