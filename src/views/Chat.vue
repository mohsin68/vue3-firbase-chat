<template>
  <div class="chat-page h-full flex justify-center items-center">
    <div class="chat-wrapper flex w-2/3 h-[600px]">
      <div
        class="chat-sidebar w-1/3 bg-dark bg-opacity-80 backdrop-blur-sm rounded-l-xl overflow-hidden"
      >
        <div class="search-wrapper p-4">
          <text-input v-model="search" placeholder="search">
            <template #prependIcon>
              <svg-icon type="mdi" :path="searchIcon"></svg-icon>
            </template>
          </text-input>
        </div>
        <div class="contacts-wrapper h-[calc(100%-4rem)] overflow-y-auto px-4">
          <contact-card
            v-for="i in 10"
            :key="i"
            :contact="{
              name: 'John Doe',
              lastMessage:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              lastMessageTime: '10:00 ',
            }"
          />
        </div>
      </div>
      <div
        class="chat-main grow-[2] bg-dark bg-opacity-60 backdrop-blur-md rounded-r-xl relative px-8 py-4"
      >
        <!-- <h4
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        >
          Please select a contact to start a chat
        </h4> -->
        <chat-widget />
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
import { ref, reactive } from "vue";
import { db } from "@/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
const search = ref("");
const searchIcon = mdiMagnify;

const contacts = reactive([]);
const currentUser = JSON.parse(localStorage.getItem("chatAppUser")).uid;
const getUsers = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const recipient = doc.data();
    if (recipient.userId !== currentUser) contacts.push(recipient);
  });
};
getUsers();
</script>

<style lang="scss">
.chat-page {
  background: url("https://images.unsplash.com/photo-1687898048961-a685f923a416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80");
  background-size: cover;
  background-position: center;
}
</style>