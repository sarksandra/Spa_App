<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/" style="color:hotpink;">Home</RouterLink>
    <RouterLink to="/about" style="color:hotpink;">About</RouterLink>
  </nav>
  <RouterView />  
</template>

<style scoped>
</style>
