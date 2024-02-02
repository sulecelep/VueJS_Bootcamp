<template>
  <ul>
    <!-- <li v-for="item in todoList" :key="item.id" class="d-flex justify-content-between align-items-center">
        <span>{{item.text}}</span>
        <button @click="deleteItem(item)" class="sm red">Sil</button>
      </li> -->

      <TodoListItem v-for="todoItem in myData" :key="todoItem.id" :item="todoItem"/>
  </ul>
</template>
<script>
import TodoListItem from "@/components/TodoListItem.vue"
export default{
  props:[
    "myData"
  ],
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