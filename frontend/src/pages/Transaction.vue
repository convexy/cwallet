<template>
  <form @submit.prevent="register">
    <div>
      <label for="date">Date</label>
      <input type="date" id="date" v-model="date" required/>
    </div>
    <div>
      <label for="type">Type</label>
      <select id="type" v-model="type">
        <option value=""></option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
    <div>
      <label for="amount">Amount</label>
      <input type="number" id="amount" v-model.number="amount" min="1" step="1" required/>
    </div>
    <div>
      <label for="note">Note</label>
      <textarea id="note" v-model="note" rows="4" cols="40"></textarea>
    </div>
    <button type="submit">Register</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const date = ref("");
const type = ref("");
const amount = ref("");
const note = ref("");
const message = ref("");

const register = async () => {
  await fetch("http://localhost:8080/api/transaction/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date:date.value, type:type.value, amount:amount.value, note:note.value })
  }).then(res => {
    if (res.ok) {
      alert("登録しました");
    }
    else{
      res.json().then(value =>console.log(value));
    }
  })
};
</script>
