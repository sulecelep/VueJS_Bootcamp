<template>
  <p>
    {{ $store.state.mainName }}
  </p>

  <p>
    {{ $store.state.musteri.contactName }}
  </p>

  <pre>
    {{musteriADI}}
  </pre>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  created(){
    console.log(this.$store.getters["musteri/_contactName"]); //namespaced yaptığımız için 
    console.log(this.$store);
  },
  computed:{
    ...mapGetters({
      musteriADI:"musteri/_contactName",

    })
  }

}
</script>

