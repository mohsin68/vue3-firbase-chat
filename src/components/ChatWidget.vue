<template>
  <div class="chat-widget h-full">
    <header class="flex items-center gap-2 border-b border-gray-400 pb-3">
      <avatar />
      <h5>John Doe</h5>
    </header>

    <main class="h-[calc(100%-9rem)] my-4"></main>

    <footer>
      <text-input v-model="message" placeholder="Type a message">
        <template #prependIcon>
          <svg-icon type="mdi" :path="messageIcon"></svg-icon>
        </template>
        <template #appendIcon>
          <button class="bg-primary text-black rounded-sm p-1 font-sm">
            <svg-icon type="mdi" :path="sendIcon" size="18"></svg-icon>
          </button>
        </template>
      </text-input>
    </footer>
  </div>
</template>

<script setup>
import TextInput from "@/components/TextInput.vue";
import Avatar from "@/components/Avatar.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMessageText, mdiSend } from "@mdi/js";
import { ref } from "vue";
const message = ref("");
const messageIcon = mdiMessageText;
const sendIcon = mdiSend;
</script>

<style>
</style>