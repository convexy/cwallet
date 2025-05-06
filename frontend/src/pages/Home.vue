<template>
  <div>
    <h1> Welcome to CWallet!</h1>
    <button @click="goToRegisterTransaction">Register Transaction...</button>
    <button @click="goToAbout">Go To About...</button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToRegisterTransaction = () => {router.push("/transaction/register")};
const goToAbout = () => {  router.push('/about');};
</script>

<style scoped>
h1 {
  color: darkseagreen;
  width: 100%;
  text-align: center;
}
</style>
