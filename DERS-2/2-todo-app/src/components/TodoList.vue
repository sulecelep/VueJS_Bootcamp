<template>
  <ul>
    

      <TodoListItem  v-for="todoItem in provideData.todoList" :key="todoItem.id" :item="todoItem"/>
  </ul>
</template>
<script>
import TodoListItem from "@/components/TodoListItem.vue"
export default{
  // props:[
  //   "myData"
  // ],
  inject:["provideData",],
  // props:{
  //   myData:{
  //     type: String,
  //     required:false,
  //     default:""

  //   }
  // },
    components:{
        TodoListItem,
    }
};
</script>
<!--props data gibi çalışıyor parent componentinden child'a data gönderildiğinde buradan alıyoruz -->