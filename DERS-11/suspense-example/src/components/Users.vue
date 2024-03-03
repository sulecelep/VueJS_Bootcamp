<script setup>
import { ref } from "vue";
//const isLoad =ref(false);
const userList = ref([]);
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    userList.value = json;
    //isLoad.value=true;

    });
</script>

<template>
    <h1>users</h1>
    <ul >
      <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
    </ul>

    <!-- <span v-else>Loading</span> -->
  </template>
  
  
