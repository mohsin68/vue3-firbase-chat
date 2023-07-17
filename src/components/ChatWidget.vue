<template>
  <div class="chat-widget h-full px-8 py-4">
    <header class="flex items-center gap-2 border-b border-gray-400 pb-3">
      <button
        class="text-white rounded-full p-1 font-sm lg:hidden"
        @click="$emit('back', null)"
      >
        <svg-icon type="mdi" :path="backIcon" size="18"></svg-icon>
      </button>

      <avatar :src="receiver.userPhotoURL" />
      <h5>
        {{ receiver.userName }}
      </h5>
    </header>
    <main
      ref="messagesWrapper"
      class="h-[calc(100%-8.5rem)] my-4 overflow-y-auto"
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
import { mdiMessageText, mdiSend, mdiArrowLeft } from "@mdi/js";
import { ref, watch, nextTick, defineProps, defineEmits } from "vue";

const props = defineProps({
  messages: {
    type: Array,
    default: [],
  },
  activeConversationId: {
    type: String,
    default: null,
  },
  receiver: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["sendMessage"]);

const messageText = ref("");
const messageIcon = mdiMessageText;
const sendIcon = mdiSend;
const backIcon = mdiArrowLeft;
const currentUser = JSON.parse(localStorage.getItem("chatAppUser")).uid;
const messagesWrapper = ref(null);

const send = () => {
  if (!messageText.value) return;
  emit("sendMessage", messageText.value, props.activeConversationId);
  messageText.value = null;
};

watch(
  () => props.messages,
  () => {
    console.log(props);
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