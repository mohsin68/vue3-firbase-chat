<template>
  <div class="chat-page h-full flex justify-center items-center">
    <div class="chat-wrapper flex w-full md:w-10/12 lg:w-2/3 h-[600px] mx-4">
      <div
        class="chat-sidebar bg-dark bg-opacity-80 backdrop-blur-sm overflow-hidden lg:w-1/3 rounded-xl lg:rounded-none lg:rounded-l-lg"
        :class="activeConversationId || receiver ? 'w-0 ' : 'w-full '"
      >
        <div class="search-wrapper p-4">
          <text-input v-model="search" placeholder="search">
            <template #prependIcon>
              <svg-icon type="mdi" :path="searchIcon"></svg-icon>
            </template>
          </text-input>
        </div>
        <div class="contacts-wrapper h-[calc(100%-4rem)] overflow-y-auto px-4">
          <div class="conversations" v-if="convs.length">
            <span class="text-primary"> conversations </span>
            <contact-card
              v-for="conversation in convs"
              :key="conversation.id"
              :contact="{
                ...conversation.contact,
                lastMessage: conversation.lastMessage,
                updatedAt: conversation.updatedAt,
              }"
              :active="conversation.id == activeConversationId"
              @click="
                setReceiver(conversation.contact);
                setActiveConversationId(conversation.id);
              "
            />
          </div>

          <div class="contacts" v-if="filteredContacts.length">
            <span class="text-primary"> contacts </span>

            <contact-card
              v-for="contact in filteredContacts"
              :key="contact.userId"
              :contact="contact"
              @click="setReceiver(contact)"
            />
          </div>
        </div>
      </div>
      <div
        class="chat-main bg-dark bg-opacity-60 backdrop-blur-md overflow-hidden rounded-xl lg:rounded-none lg:rounded-r-xl lg:w-2/3"
        :class="activeConversationId || receiver ? 'w-full ' : ''"
      >
        <chat-widget
          v-if="activeConversationId || receiver"
          :conversationId="activeConversationId"
          :receiver="receiver"
          @send-message="
            (message) => sendMessage(message, activeConversationId)
          "
          :messages="messages"
          @back="
            setActiveConversationId(null);
            setReceiver(null);
          "
        />
        <h4
          v-else
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          Please select a contact or conversation to start a chat
        </h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatWidget from "@/components/ChatWidget.vue";
import ContactCard from "@/components/ContactCard.vue";
import TextInput from "@/components/TextInput.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMagnify } from "@mdi/js";
import { ref, computed } from "vue";
import useContacts from "@/compositions/useContacts";
import useChat from "@/compositions/useChat";
const { contacts } = useContacts();
const {
  activeConversationId,
  receiver,
  messages,
  setActiveConversationId,
  setReceiver,
  sendMessage,
  orderedConversations,
} = useChat();

const search = ref("");
const searchIcon = mdiMagnify;
const currentUserId = JSON.parse(localStorage.getItem("chatAppUser")).uid;

const convs = computed(() => {
  return orderedConversations.value.map((conv) => {
    const membres = [conv.member1, conv.member2];
    const contact = membres.find((member) => member.userId != currentUserId);
    return {
      ...conv,
      contact,
    };
  });
});

const filteredContacts = computed(() => {
  return contacts.filter((contact) => {
    const convsIds = convs.value.map((conv) => conv.contact.userId);
    return !convsIds.includes(contact.userId);
  });
});
</script>

<style lang="scss">
.chat-page {
  background: url("https://images.unsplash.com/photo-1687898048961-a685f923a416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80");
  background-size: cover;
  background-position: center;
}
</style>