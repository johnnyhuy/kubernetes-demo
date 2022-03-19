<script setup lang="ts">
import { nextTick, onMounted, Ref, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Todo } from "../todo";
import Loading from "./Loading.vue";

const todos = ref<Todo[]>([]);
const errors: Ref<string[]> = ref([]);
const isLoadingTodos = ref(true);

const showError = (message: any) => {
  if (errors.value.find((error) => error === message)) {
    return;
  }

  errors.value.push(message);
};

const getAllTodos = async () => {
  const getTodos = await fetch(
    `${import.meta.env.VITE_TODO_BACKEND_URL}/todos`
  );

  isLoadingTodos.value = false;

  todos.value = (await getTodos.json()) as Todo[];
};

const createTodo = async (todo: Todo) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_TODO_BACKEND_URL}/todos`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    );

    if (!response.ok) throw response.statusText;
  } catch (error) {
    showError(error);
    console.error(error);
  }
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

    
  } catch (error) {
    console.error(error);
  }
};

const clearEditTodos = () => {
  if (todos.value === null) {
    return;
  }

  for (const todo of todos.value) {
    todo.edit = false;
  }
};

const handleEnterCreateTodo = async (payload: KeyboardEvent) => {
  const target = payload.target as HTMLInputElement;
  errors.value = [];

  if (target.value === "") {
    showError("Todo todo cannot be nothing");
    return;
  }

  await createTodo({ content: target.value });
  await getAllTodos();

  target.value = "";
};

const handleEnterUpdateTodo = (todo: Todo) => {
  if (todo.content === "") {
    showError("Updated todo cannot be nothing");
    return;
  }

  clearEditTodos();
  errors.value = [];
};

const handleClickOutsideEditTodo = (todo: Todo) => {
  todo.edit = false;
};

const handleEditTodoInput = (element: any, todo: Todo) => {
  todo.input = element;
  onClickOutside(element, () => handleClickOutsideEditTodo(todo));
};

const handleUpdateTodo = (todo: Todo) => {
  todo.edit = true;
  nextTick(() => {
    todo.input?.focus();
    todo.input?.select();
  });
};

const handleDeleteTodo = async (todo: Todo) => {
  await deleteTodo(todo)
  await getAllTodos();
};

onMounted(async () => {
  await getAllTodos();
});
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div v-if="!isLoadingTodos" class="form-control">
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
            @click="handleUpdateTodo(todo)"
            class="flex items-center text-left flex-1 cursor-pointer ml-4"
          >
            {{ todo.content }}
          </div>
          <input
            v-show="todo.edit"
            v-model="todo.content"
            :ref="(element) => handleEditTodoInput(element, todo)"
            @keyup.enter="handleEnterUpdateTodo(todo)"
            type="text"
            placeholder="Type here to update todo"
            class="input input-sm w-full mx-4"
          />
          <button
            class="btn btn-sm btn-circle btn-warning btn-outline opacity-25 hover:opacity-100"
            @click="handleDeleteTodo(todo)"
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
      <Loading v-else class="mx-auto" />
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
          placeholder="✍️ Add a todo"
          @keyup.enter="handleEnterCreateTodo"
          class="input input-sm w-full"
        />
      </div>
    </div>
  </div>
</template>
