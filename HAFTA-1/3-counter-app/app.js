const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      counter2: 0,
    };
  },
  methods: {
    
  },
  computed:{
    getCounterResult() {
      console.log("Counter 1 Çalıştı");
      return this.counter > 5 ? "Büyük" : "Küçük";
    },
    getCounter2Result() {
      console.log("Counter 2 Çalıştı");
      return this.counter2 > 5 ? "Büyük" : "Küçük";
    },
  },
  watch:{
    counter(newValue,oldValue){
      console.log("Counter", oldValue,"=>",newValue);
    },
    getCounterResult(newValue,oldValue){
      console.log("Result", oldValue,"=>",newValue);
    },
  },

}).mount("#app");
