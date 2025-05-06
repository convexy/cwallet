<template>
  <form @submit.prevent="register">
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name" placeholder="Name" required/>
    </div>
    <div>
      <label for="email">EMail</label>
      <input type="email" id="email" v-model="email" placeholder="email" required/>
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" placeholder="password" required/>
    </div>
    <button type="submit">Register</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");

const register = async () => {
  console.log({ name: name.value, email: email.value, password: password.value });
  await fetch("http://localhost:8080/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
  });
  alert("登録しました");
};
</script>
