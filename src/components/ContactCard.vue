<template>
  <div
    class="contact-card flex gap-2 mb-4 items-center cursor-pointer hover:bg-dark hover:bg-opacity-20 rounded-md transition p-2"
  >
    <div
      class="contact-card__avatar w-16 h-16 object-cover rounded-full overflow-hidden"
    >
      <img
        class="w-full h-full rounded-full"
        :src="require(`@/assets/images/person.jpg`)"
        alt="avatar"
      />
    </div>
    <div
      class="contact-card__info w-full max-w-[calc(100%-4.5rem)] flex justify-between"
    >
      <div>
        <div class="contact-card__info__name font-semibold text-lg">
          {{ contact.name }}
        </div>
        <div
          class="contact-card__info__last-message text-sm text-gray-400 w-40 truncate"
        >
          {{ contact.lastMessage }}
        </div>
      </div>
      <div class="contact-card__info__last-message-time text-xs text-primary">
        {{ contact.lastMessageTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  contact: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style>
</style>