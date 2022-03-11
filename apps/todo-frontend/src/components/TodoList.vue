<script setup lang="ts">
import { nextTick, Ref, ref } from "vue";

interface Todo {
  id: number;
  checked: boolean;
  edit: boolean;
  content: string;
  input?: any;
}

defineProps<{ msg: string }>();

const items: Ref<Todo[]> = ref([
  {
    id: 0,
    checked: false,
    edit: false,
    content: "🚨 Item 1",
  },
  {
    id: 1,
    checked: false,
    edit: false,
    content: "👺 Item 2",
  },
]);

const clearAllEditedItems = () => {
  for (const item of items.value) {
    item.edit = false;
  }
}

const onEnterAddItem = (event: { target: HTMLInputElement }) => {
  items.value.push({
    id: 0,
    checked: false,
    edit: false,
    content: event.target.value,
  })

  event.target.value = ''
};

const onEnterItem = () => {
  clearAllEditedItems()
};

const clickAwayItem = () => {
  clearAllEditedItems()
};

const clickItem = (todo: Todo) => {
  todo.edit = true;
  nextTick(() => {
    todo.input?.focus();
  });
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
          <span
            v-if="!item.edit"
            @click="clickItem(item)"
            class="ml-4 cursor-pointer"
            >{{ item.content }}</span
          >
          <input
            v-else
            v-model="item.content"
            v-click-away="clickAwayItem"
            @keyup.enter="onEnterItem"
            :ref="
              (element) => {
                item.input = element;
              }
            "
            type="text"
            placeholder="Type here"
            class="input input-sm w-full max-w-xs ml-4"
          />
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
