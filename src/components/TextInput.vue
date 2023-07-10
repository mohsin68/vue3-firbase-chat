<template>
  <div
    class="text-input w-full bg-dark bg-opacity-60 rounded-md px-3 py-2 flex items-center focus-within:ring-2 focus-within:ring-primary transition"
  >
    <slot name="prependIcon"></slot>
    <input
      :value="modelValue"
      type="text"
      class="w-full bg-transparent focus:outline-none mx-2"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot name="appendIcon"></slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  placeholder: {
    type: String,
    default: "Search",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style>
</style>