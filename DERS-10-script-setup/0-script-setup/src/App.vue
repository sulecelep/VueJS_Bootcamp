<template>
  <h3>{{ title }}</h3>
  <input type="text" v-model="title">
  <button @click="inc">{{ counter }}</button>
  <hr>
  <oddOrEven :counter="counter" @odd-event="alertMe"/>
  <hr>
  <h1>User App</h1>
  <input type="text" v-model="data.personal.name">
  <input type="text" v-model="data.personal.lname">
  {{ data.personal }}
</template>

<script setup>
import {ref, reactive,watch} from "vue";
import oddOrEven from "./components/oddOrEven.vue";
import Utils from "./composables/Utils.js";

const { title, counter, inc, alertMe }=Utils();

// User App
// const name= ref("");
// const lname= ref(""); //bu şekilde ref tanımlanması tercih edilmiyor
const data= reactive({
  personal:{
    name:null,
    lname:null,
  },
});

// () =>JSON.parse(JSON.stringify(state.personal))
watch(() =>JSON.parse(JSON.stringify(data.personal)), (newPersonal,oldPersonal)=>{
  console.log(oldPersonal);
  console.log(newPersonal);
  
})


</script>
