<template>
  <div
    class="auth h-full text-center flex items-center justify-center flex-col"
  >
    <h1 class="font-sans">Sign In To Start Chating</h1>
    <button
      class="bg-primary text-dark rounded px-8 py-2 mt-4 text-lg"
      @click="signIn"
    >
      <img
        class="inline-block w-8 h-8 mr-2"
        src="@/assets/images/google.png"
        alt="Google"
      />
      Sign in with Google
    </button>
  </div>
</template>

<script setup>
import useAuth from "@/compositions/useAuth";
const { signIn, user } = useAuth();
</script>
