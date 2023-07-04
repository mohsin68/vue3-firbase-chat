<template>
  <div class="chat-page h-full flex justify-center items-center">
    <div class="chat-wrapper flex w-2/3 h-[500px]">
      <div
        class="chat-sidebar w-1/3 bg-dark bg-opacity-80 backdrop-blur-sm rounded-l-xl px-6 py-4"
      >
        <text-input v-model="search" placeholder="search">
          <template #prependIcon>
            <svg-icon type="mdi" :path="searchIcon"></svg-icon>
          </template>
        </text-input>
      </div>
      <div
        class="chat-main grow-[2] bg-dark bg-opacity-60 backdrop-blur-md rounded-r-xl"
      ></div>
    </div>
  </div>
</template>

<script setup>
import TextInput from "@/components/TextInput.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMagnify } from "@mdi/js";
import { ref } from "vue";
const search = ref("");
const searchIcon = mdiMagnify;
</script>

<style lang="scss">
.chat-page {
  background: url("https://images.unsplash.com/photo-1687898048961-a685f923a416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80");
  background-size: cover;
  background-position: center;
}
</style>