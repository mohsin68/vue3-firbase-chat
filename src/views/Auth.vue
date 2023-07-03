<template>
  <div
    class="auth h-full text-center flex items-center justify-center flex-col"
  >
    <h1 class="">Welcome to the vue firebase chat app</h1>
    <button
      class="bg-primary text-dark rounded px-8 py-2 mt-4 text-lg"
      @click="signIn"
    >
      <img
        class="inline-block w-6 h-6 mr-2"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1176px-Google_%22G%22_Logo.svg.png?20230305195327"
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
