<script setup lang="ts">
import { nextTick, onMounted, reactive, Ref, ref } from "vue";
import { useFetch, onClickOutside } from "@vueuse/core";
import { Todo } from "../todo";

const todos = ref<Todo[]>([]);

const fetchTodos = async () => {
  const getTodos = await fetch(
    `${import.meta.env.VITE_TODO_BACKEND_URL}/todos`
  );

  todos.value = (await getTodos.json()) as Todo[];
};

let errors: Ref<string[]> = ref([]);

const showError = (message: any) => {
  if (errors.value.find((error) => error === message)) {
    return;
  }

  errors.value.push(message);
};

const clearAllEditedTodos = () => {
  if (todos.value === null) {
    return;
  }

  for (const todo of todos.value) {
    todo.edit = false;
  }
};

const onEnterAddTodo = async (payload: KeyboardEvent) => {
  const target = payload.target as HTMLInputElement;
  errors.value = [];

  if (target.value === "") {
    showError("Todo todo cannot be nothing");
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_BACKEND_URL}/todos`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: target.value }),
      }
    );

    if (!response.ok) throw response.statusText;

    await fetchTodos();
  } catch (error) {
    showError(error);
    console.error(error);
  }

  target.value = "";
};

const onEnterUpdateTodo = (todo: Todo) => {
  if (todo.content === "") {
    showError("Updated todo cannot be nothing");
    return;
  }

  clearAllEditedTodos();
  errors.value = [];
};

const handleEditTodoInput = (element: any, todo: Todo) => {
  todo.input = element;
  onClickOutside(element, () => (todo.edit = false));
};

const updateTodo = (todo: Todo) => {
  todo.edit = true;
  nextTick(() => {
    todo.input?.focus();
    todo.input?.select();
  });
};

const deleteTodo = async (todo: Todo) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_BACKEND_URL}/todos/${todo.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) throw response.statusText;

    await fetchTodos();
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchTodos();
});
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="form-control">
        <div
          v-for="(todo, key) in todos"
          :key="key"
          class="flex justify-start select-none todos-center px-1 py-2"
        >
          <label class="flex cursor-pointer todos-center">
            <input
              :checked="!!todo.completedAt"
              @input="todo.completedAt = new Date()"
              type="checkbox"
              class="checkbox checkbox-primary checkbox-lg"
            />
          </label>
          <div
            v-show="!todo.edit"
            @click="updateTodo(todo)"
            class="flex items-center text-left flex-1 cursor-pointer ml-4"
          >
            {{ todo.content }}
          </div>
          <input
            v-show="todo.edit"
            v-model="todo.content"
            :ref="(element) => handleEditTodoInput(element, todo)"
            @keyup.enter="onEnterUpdateTodo(todo)"
            type="text"
            placeholder="Type here to update todo"
            class="input input-sm w-full max-w-xs mx-4"
          />
          <button
            class="btn btn-sm btn-circle btn-warning btn-outline opacity-25 hover:opacity-100"
            @click="deleteTodo(todo)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="errors.length > 0">
        <div
          v-for="(error, key) in errors"
          :key="key"
          class="alert alert-error shadow-lg text-left mt-4"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ error }}</span>
          </div>
        </div>
      </div>
      <div class="form-control pt-4">
        <input
          type="text"
          placeholder="✍️ Add a todo todo"
          @keyup.enter="onEnterAddTodo"
          class="input input-sm w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
