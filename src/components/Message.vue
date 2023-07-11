<template>
  <div
    class="message flex gap-2 mb-4"
    :class="sender ? 'flex-row-reverse' : 'flex-row'"
  >
    <div class="message__avatar">
      <avatar :src="message.userPhotoURL" />
    </div>
    <div
      class="message__content w-max max-w-[75%] px-4 py-2 rounded-xl mt-2"
      :class="
        sender
          ? 'bg-primary text-black rounded-tr-none'
          : ' bg-dark bg-opacity-50 text-muted rounded-tl-none'
      "
    >
      <div class="message__content__text">
        {{ message.text }}
      </div>
      <!-- <div
        class="message__content__time text-xs text-right"
        :class="sender ? 'text-black' : 'text-white'"
      >
        12:00 PM
      </div> -->
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { defineProps, computed } from "vue";
const props = defineProps({
  message: {
    type: Object,
    default: () => ({}),
  },
  sender: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
</style>