<template>
  <div
    class="contact-card flex gap-2 mb-4 items-center cursor-pointer hover:bg-dark hover:bg-opacity-20 rounded-md transition p-2"
  >
    <div class="contact-card__avatar">
      <avatar :src="contact.userPhotoURL" />
    </div>
    <div
      class="contact-card__info w-full max-w-[calc(100%-3.5rem)] flex justify-between"
    >
      <div>
        <div class="contact-card__info__name font-semibold">
          {{ contact.userName }}
        </div>
        <div
          class="contact-card__info__last-message text-sm text-gray-400 w-40 truncate"
        >
          <!-- {{ contact.lastMessage }} -->
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
          laborum minus assumenda? Modi asperiores voluptate fugiat, aperiam
          atque quidem veritatis illo sed, voluptas reiciendis excepturi maiores
          tempore distinctio, illum dignissimos!
        </div>
      </div>
      <div class="contact-card__info__last-message-time text-xs text-primary">
        <!-- {{ contact.lastMessageTime }} -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
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