<template>
  <img class="w-12 h-12 rounded-full object-cover" :src="src" alt="" />
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  src: {
    type: String,
    default: "require(`@/assets/images/person.jpg`)",
  },
});
</script>

<style>
</style>