<script setup>
//import Todos from "./components/Todos.vue";
//import Users from "./components/Users.vue";
import { onErrorCaptured, ref, defineAsyncComponent } from "@vue/runtime-core";
const err = ref(null);
const Todos = defineAsyncComponent(() => import("./components/Todos.vue"));
const Users = defineAsyncComponent(() => import("./components/Users.vue"));
onErrorCaptured((e) => {
  err.value = e;
  return true;
});
</script>

<template>
  <span v-if="err" class="error">{{ err }}</span>
  <Suspense v-else>
    <template #default>
      <div>
        <Users />
        <hr />
        <Todos />
      </div>
    </template>
    <template #fallback>
      <div>Loading ....</div>
    </template>
  </Suspense>
  <!-- <h1>Appvue</h1> -->
  <!-- <Users /> -->
  <hr />
</template>

<style scoped>
.error {
  color: red;
  font-size: 20px;
}
</style>
