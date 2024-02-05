<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center">
      <button class="red" @click="activeComponent = 'Red'">Red</button>

      <button class="green" @click="activeComponent = 'Green'">Green</button>
      <button class="blue" @click="activeComponent = 'Blue'">Blue</button>
    </div>

    <!-- <Red v-if="activeComponent == 'Red'" class="mb-2"></Red>
    <Green v-if="activeComponent == 'Green'" class="mb-2"></Green>
    <Blue v-if="activeComponent == 'Blue'" class="mb-2"></Blue> -->
    <keep-alive>
      <component :is="activeComponent" msg="Red Component 2">
        <h3 class="bg-green text-white">Green Component</h3>
      </component>
    </keep-alive>
  </div>
</template>

<script>
import Red from "./components/Red.vue";
import Green from "./components/Green.vue";
import Blue from "./components/Blue.vue";

export default {
  name: "App",
  components: {
    Red,
    Green,
    Blue,
  },
  data() {
    return {
      activeComponent: "Red",
    };
  },
};
</script>
