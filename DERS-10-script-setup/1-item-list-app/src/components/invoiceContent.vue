<template>
  <section class="bg-gray-900 w-1/3 mx-auto mt-10 p-2 px-5 rounded-md shadow-2xl">
    <!-- Fatura Bilgileri -->
    <contact-section :contact="data.contact" />

    <div class="mt-5">
      <heading title="Fatura Kalemleri" />

      <invoice-items :items="data.items" :AddInvoiceItem="AddInvoiceItem" />
    </div>
    <!-- Summary -->
    <invoice-summary :items="data.items" />

    <hr class="bg-gradient-to-r h-[1px] border-none from-gray-700 mt-5" />
    <div class="actionbar text-right my-5">
      <button @click="onSubmit" class="purple-button">Kaydet</button>
    </div>
  </section>
</template>

<script setup>
import { reactive, provide, watch } from "vue";
import invoiceItems from "./invoiceItems.vue";
import invoiceSummary from "./invoiceSummary.vue";
import contactSection from "./contactSection.vue";

const props= defineProps({saveInvoice : Function, activeInvoice:[Object,null]})
const data = reactive({
  id: null,
  created_at:null,
  contact: {
    
    contact_name: null,
    email: null,
    city: null,
    country: null,
    zipcode: null,
  },
  items: [],
});
const AddInvoiceItem = () => {
  data.items.push({
    id: new Date().getTime(),
    name: null,
    qty: null,
    unit_price: 0.0,
    total_price: 0.0,
  });
};

const DeleteInvoiceItem = (invoiceItem) => {
  console.log(invoiceItem);
  data.items = data.items.filter((i) => i.id != invoiceItem.id);
};

provide("DeleteInvoiceItem", DeleteInvoiceItem);

const onSubmit = () => {
  //console.log(data)
  
  props.saveInvoice({...data, created_at: new Date(), id: new Date().getTime()});
  data.contact ={
    contact_name: null,
    email: null,
    city: null,
    country: null,
    zipcode: null,
  };
  data.items=[];
};

watch(()=>props.activeInvoice,(activeInvoice)=>{
  console.log('activeInvoice', activeInvoice)
  if(activeInvoice)
  {
    data.contact= {...activeInvoice.contact};
    data.items= [...activeInvoice.items];
  }
})

</script>
