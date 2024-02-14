<template>
  <h3>{{ title }}</h3>
  <input type="text" v-model="title" />
  {{ titleLengthMessage }}
  <button @click="toggleIt">Toggle</button>
  <p v-if="show">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, dolor.</p>

  <hr />
  <button @click="counter++">{{ counter }} - {{ oddOrEven }}</button>

  <hr />

  <input type="text" v-model="searchText" />
  <p v-if="isTyping">Şu an yazıyor....</p>
</template>

<script>
import Counter from "./composables/Counter.js";
import Header from "./composables/Header.js";
import Search from "./composables/Search.js";
import Toggle from "./composables/Toggle.js";

export default {
  setup() {
    
    const { counter, oddOrEven} = Counter();
    const { title, titleLengthMessage} = Header();
    const { searchText, isTyping} = Search();
    const { show, toggleIt} = Toggle();

    
    return {
      title,
      show,
      toggleIt,
      titleLengthMessage,
      counter,
      oddOrEven,
      searchText,
      isTyping,
    };
  },
};
</script>
