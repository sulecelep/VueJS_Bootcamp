<template>
  <appHeader />
  <div class="flex flex-row">
    <Sidebar />
    <appBookmarkList/>

    
  </div>
</template>

<script>
import Sidebar from "@/components/Home/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
};
</script>
