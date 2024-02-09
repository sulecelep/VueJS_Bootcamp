const app = Vue.createApp({
  data() {
    return {
        search:"",
        itemList:["elma","armut","kiraz","çilek","elsa"],
        //filteredList:[]
      
    };
  },
  methods:{
    searchList(){
      //this.filteredList=this.itemList.filter(i=>i.includes(this.search)); //search inputunda yazılanı filtreleme
      //console.log('filteredList :>>', filteredList);
    },
  },
  computed:{
    filteredList(){
      return this.filteredList=this.itemList.filter(i=>i.includes(this.search)); //search inputunda yazılanı filtreleme
    },
  },


}).mount("#app");
