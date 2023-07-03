<template>
  <div class="chat-page h-full flex justify-center items-center">
    <div class="chat-wrapper flex w-2/3 h-[500px]">
      <div
        class="chat-sidebar flex-grow bg-[#131313] bg-opacity-60 rounded-l-xl px-6 py-4"
      ></div>
      <div
        class="chat-main grow-[2] bg-[#232323] bg-opacity-30 rounded-r-xl"
      ></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.chat-page {
  background: #16222a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #3a6073,
    #16222a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #3a6073,
    #16222a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>