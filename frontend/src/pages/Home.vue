<template>
  <div>
    <h1> Welcome to CWallet!</h1>
    <button @click="goToRegisterUser">Register User...</button>
    <button @click="goToAbout">Go To About...</button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goToRegisterUser = () => {router.push("/user/register")};
const goToAbout = () => {  router.push('/about');};
</script>

<style scoped>
h1 {
  color: darkseagreen;
  width: 100%;
  text-align: center;
}
</style>
