<script setup lang="ts">
import { nextTick, reactive, Ref, ref } from "vue";

interface Todo {
  id: string;
  checked: boolean;
  edit: boolean;
  content: string;
  input?: any;
}

defineProps<{ msg: string }>();

let errors: Ref<string[]> = ref([])

const error = (message: string) => {
  if (errors.value.find(error => error === message)) {
    return
  }

  errors.value.push(message)
}

// Temp
const uid = () => {
  return (
    String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
    Math.random().toString(16).slice(2) +
    Date.now().toString(16).slice(4)
  );
};

const items: Ref<Todo[]> = ref([
  {
    id: uid(),
    checked: false,
    edit: false,
    content: "🚨 Item 1",
  },
  {
    id: uid(),
    checked: false,
    edit: false,
    content: "👺 Item 2",
  },
]);

const clearAllEditedItems = () => {
  for (const item of items.value) {
    item.edit = false;
  }
};

const onEnterAddItem = (payload: KeyboardEvent) => {
  const target = payload.target as HTMLInputElement;

  if (target.value === '') {
    error('Todo item cannot be nothing')
    return
  }

  items.value.push({
    id: uid(),
    checked: false,
    edit: false,
    content: target.value,
  });

  target.value = "";
};

const onEnterUpdateItem = (item: Todo) => {
  if (item.content === '') {
    error('Updated todo item cannot be nothing')
    return
  }
  clearAllEditedItems();
};

const clickAwayUpdateItem = () => {
  clearAllEditedItems();
};

const updateItem = (todo: Todo) => {
  todo.edit = true;
  nextTick(() => {
    todo.input?.focus();
  });
};

const deleteItem = (item: Todo) => {
  items.value = items.value.filter((filterItem) => filterItem.id !== item.id);
};
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="form-control">
        <div
          v-for="(item, key) in items"
          :key="key"
          class="flex justify-start select-none items-center px-1 py-2"
        >
          <label class="flex cursor-pointer items-center">
            <input
              v-model="item.checked"
              type="checkbox"
              class="checkbox checkbox-primary checkbox-lg"
            />
          </label>
          <div
            v-if="!item.edit"
            @click="updateItem(item)"
            class="text-left flex-1 cursor-pointer"
          >
            <span class="ml-4">{{ item.content }}</span>
          </div>
          <input
            v-else
            v-model="item.content"
            v-click-away="clickAwayUpdateItem"
            @keyup.enter="onEnterUpdateItem(item)"
            :ref="
              (element) => {
                item.input = element;
              }
            "
            type="text"
            placeholder="Type here to update item"
            class="input input-sm w-full max-w-xs mx-4"
          />
          <button
            class="btn btn-sm btn-circle btn-warning btn-outline opacity-25 hover:opacity-100"
            @click="deleteItem(item)"
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
        <div v-for="(error, key) in errors" :key="key" class="alert alert-error shadow-lg text-left mt-4">
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
          placeholder="✍️ Add a todo item"
          @keyup.enter="onEnterAddItem"
          class="input input-sm w-full max-w-xs"
        />
      </div>
    </div>
  </div>
</template>
