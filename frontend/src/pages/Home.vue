<template>
  <div>
    <p><strong>所持金</strong>{{ amount }}円</p>
  </div>
  <div>
    <button @click="goToRegisterTransaction">Register Transaction...</button>
    <button @click="goToAbout">Go To About...</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const goToRegisterTransaction = () => {router.push("/transaction/register")};
const goToAbout = () => {  router.push('/about');};

const amount = ref<number | null>(null);
onMounted(async () => {
  try{
    const res = await fetch("http://localhost:8080/api/balance/get", {
      method: "GET",
    });
    if (res.ok) {
      const wallet = await res.json();
      amount.value = wallet.amount;
    }
    else{
      console.error(res.body);
    }
  } 
  catch (err) {
    console.error((err as Error).message);
  }
});
</script>

<style scoped>
h1 {
  color: darkseagreen;
  width: 100%;
  text-align: center;
}
</style>
