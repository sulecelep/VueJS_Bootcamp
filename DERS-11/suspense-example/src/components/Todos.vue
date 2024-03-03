<script setup>
import { ref } from "vue";

const todoList = ref([]);
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    todoList.value = json;
    //isLoad.value = true;
  });
</script>

<template>
  <h1>todos</h1>
  <ul >
    <li v-for="todo in todoList" :key="todo.id">{{ todo.title }}</li>
  </ul>
  <!-- <span v-else>Loading</span> -->
</template>
