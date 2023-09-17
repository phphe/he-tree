<template>
  <a class="he-tree__open-icon" :class="{ open: open }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <title>chevron-right</title>
      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  props: {
    open: { type: Boolean },
  },
})
</script>

<style>
.he-tree__open-icon {
  cursor: pointer;
  user-select: none;
  display: inline-block;
}

.he-tree__open-icon.open {
  transform: rotate(90deg);
}

.he-tree__open-icon svg {
  width: 1em;
}
</style>