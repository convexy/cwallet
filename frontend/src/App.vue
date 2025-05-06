<template>
  <header>
    <h1>CWallet</h1>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
</script>

<style scoped>
header {
  background-color: red;
}
h1 {
  margin:0;
  text-align: center;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
</style>