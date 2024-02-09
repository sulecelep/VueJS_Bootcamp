<template>
  <h1>Home</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam a dignissimos voluptatibus omnis vero! Eum alias illo quas distinctio tempore.</p>
  <input type="text" @keydown.enter="goToDetails" >

</template>

<script>
export default {
    
    methods:{
      goToDetails(e){
            //this.$router.push(`/detay/${e.target.value}`); // 1. yöntem

            this.$router.push({
              name:"DetailPage",
              params:{
                userID: e.target.value,
              },
              query:{
                type:"DetailAuth",
                user:"sulecelep",
              }
            });
        }
    }
}

</script>
