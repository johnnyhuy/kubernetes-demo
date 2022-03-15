<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import TodoList from './components/TodoList.vue'
import { Todo } from './todo';
import Loading from './components/Loading.vue';

const { isFetching, data } = useFetch<Todo[]>(`${import.meta.env.VITE_TODO_BACKEND_URL}/todos`).get().json()
</script>

<template>
  <div class="w-96 mx-auto">
    <h2 class="text-4xl font-bold mb-4">Todo App</h2>
    <p class="mb-4">Let's start the day with a todo</p>
    <Loading v-if="isFetching" />
    <TodoList v-else class="mb-8" :todos="data" />
    <p class="italic text-gray-400 text-sm">Brought to you by <a href="https://kubernetes.io" class="text-blue-500 hover:underline">Kubernetes</a></p>
  </div>
</template>

<style lang="postcss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
