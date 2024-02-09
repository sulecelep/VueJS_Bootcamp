<template>
  <app-header/>
  <div class="container">
  <h3> Bu benim ilk Vue CLI Uygulamam</h3>
  <p>Bugün Component çalışıyoruz</p>
</div>
<CounterItem/>
</template>

<script>
import CounterItem from "@/components/CounterItem";
export default{
  components : {
    //CounterItem: CounterItem,
    //CounterItem,
    CounterItem,
  },

};
</script>

<style>

</style>
