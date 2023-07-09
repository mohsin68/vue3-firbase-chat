<template>
  <div class="message flex flex-row-reverse gap-2">
    <div class="message__avatar">
      <avatar />
    </div>
    <div
      class="message__content w-3/4 bg-primary text-black px-4 py-2 rounded-xl rounded-tr-none mt-2"
    >
      <div class="message__content__text">
        I think we can meeet tommorow and discuss about the project.
      </div>
      <div class="message__content__time text-xs text-gray-600 text-right">
        12:00 PM
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { defineProps } from "vue";
const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style>
</style>