<template>
  <div class="w-screen h-screen bg-gray-800 flex flex-row text-white items-start justify-center">
    <app-sidebar :invoices="invoiceList" :editInvoice="editInvoice"/>
    <invoice-content :saveInvoice="saveInvoice" :activeInvoice="data.activeInvoice" />
    
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import appSidebar from "./components/appSidebar.vue"
import invoiceContent from "./components/invoiceContent.vue"
const invoiceList= ref([{
  id: new Date().getTime(),
  contact:{
    contact_name:"Demo",
    email: "demo@gmail.com",
    city:  "İstanbul",
    country: "Türkiye",
    zipcode: "34589",
  },
  items:[
    {
      id: new Date().getTime(),
      name:"Ürün Demo",
      qty:1,
      unit_price:12.50,
      total_price:12.50,
    }
  ],
}]);
const data= reactive({
  activeInvoice:null,
});
const saveInvoice=(invoice)=>{
  invoiceList.value.push(invoice);
};
const editInvoice =(invoice)=>{
 console.log('invoice', invoice);
 data.activeInvoice = invoice;
//  setTimeout(() => {
//   data.activeInvoice=null;
  
//  }, 2000);
}

</script>
