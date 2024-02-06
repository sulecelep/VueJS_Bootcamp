<template>
  <UserList />
  <NewUser />
</template>

<script>
import UserList from "@/components/UserList.vue";
import NewUser from "@/components/NewUser.vue";

export default {
  name: "App",
  components: {
    UserList,
    NewUser,
  },
};
</script>
