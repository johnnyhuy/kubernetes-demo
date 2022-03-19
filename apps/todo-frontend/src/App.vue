<script setup lang="ts">
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div class="w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 px-8 sm:mx-auto">
    <h2 class="text-4xl font-bold mb-4">📝 Todo</h2>
    <p class="mb-4 italic">Let's start the day with a todo</p>
    <TodoList class="mb-8" />
    <p class="italic text-gray-400 text-sm">Brought to you by <a href="https://kubernetes.io" class="text-blue-500 hover:underline">Kubernetes</a></p>
  </div>
</template>

<style lang="postcss">
#app {
  @apply mt-24;

  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
