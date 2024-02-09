<template>
    <!-- <h1>Detaylar</h1> -->
    <h1>{{ $route.params.userID }}</h1>
    <p>Açıklamalar burada yer alacaktır..</p>

    <p>{{ $route.query.user }}</p>
    <p>{{ $route.query.type }}</p>
    

    <button @click="goBack" >Geri Dön</button>

</template>

<script>
export default {
    created(){
        console.log(this.$route)
    },
    methods:{
        goBack(){
            this.$router.push("/"); // 1. yöntem
        }
    }
}

</script>