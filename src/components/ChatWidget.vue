<template>
  <div class="chat-widget h-full">
    <header class="flex items-center gap-2 border-b border-gray-400 pb-3">
      <avatar />
      <h5>John Doe</h5>
    </header>

    <main
      ref="messagesWrapper"
      class="h-[calc(100%-9rem)] my-4 overflow-y-auto"
    >
      <message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :sender="currentUser == message.userId"
      />
    </main>

    <footer>
      <text-input
        v-model="messageText"
        placeholder="Type a message"
        @keydown.enter="send"
      >
        <template #prependIcon>
          <svg-icon type="mdi" :path="messageIcon"></svg-icon>
        </template>
        <template #appendIcon>
          <button
            class="bg-primary text-black rounded-sm p-1 font-sm"
            @click="send"
          >
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
import Message from "@/components/Message.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMessageText, mdiSend } from "@mdi/js";
import useChat from "@/compositions/useChat";
import { ref, watch, nextTick } from "vue";
const { messages, sendMessage } = useChat();
const messageText = ref("");
const messageIcon = mdiMessageText;
const sendIcon = mdiSend;
const currentUser = JSON.parse(localStorage.getItem("chatAppUser")).uid;
const messagesWrapper = ref(null);

const send = () => {
  if (!messageText.value) return;
  sendMessage(messageText.value);
  messageText.value = null;
};

watch(
  messages,
  () => {
    nextTick(() => {
      messagesWrapper.value.scrollTop = messagesWrapper.value.scrollHeight;
    });
  },
  {
    deep: true,
  }
);
</script>

<style>
</style>