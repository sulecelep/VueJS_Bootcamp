<template>
    <ul>
    <li v-for="(item,index) in woodItems" :key="item">{{ item.title }}</li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
    ...mapGetters({
      woodItems:"_woodItems",
      activeUser:"_activeUser"
    })
   
  }
}

</script>