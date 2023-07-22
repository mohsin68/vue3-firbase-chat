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
          {{ contact.lastMessage }}
        </div>
      </div>
      <div
        v-if="contact.updatedAt"
        class="contact-card__info__last-message-time text-xs text-primary"
      >
        {{ formatTimestamp(contact.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from "@/components/Avatar.vue";
import { defineProps } from "vue";
import moment from "moment";
const props = defineProps({
  contact: {
    type: Object,
    default: () => ({}),
  },
});

const formatTimestamp = (timestamp) => {
  const date = moment.unix(timestamp.seconds);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "day").startOf("day");

  if (date.isSame(today, "d")) {
    // It's today, return the time with AM/PM
    return date.format("h:mm A");
  } else if (date.isSame(yesterday, "d")) {
    // It's yesterday
    return "Yesterday";
  } else {
    // Return the date formatted as 15/7/2023
    return date.format("D/M/YY");
  }
};
</script>

<style>
</style>