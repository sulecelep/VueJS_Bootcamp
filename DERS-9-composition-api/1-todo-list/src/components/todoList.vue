<template>
     <section class="mt-4">
       <TodoListItem @delete-event="$emit('delete-event',$event)" v-for="item in todoList" :key="item.id" :todo="item"/>
       <small>{{todoLength}} adet item vardır ...</small>
       <Summary :todoList="todoList"/>
        
      </section>
</template>

<script>
import TodoListItem from './todoListItem.vue';
import Summary from './Summary.vue';
import { computed} from "vue";
export default {
    components:{
        TodoListItem,
        Summary
    },
    props:{
        todoList: Array,

    },
    setup(props){
        
        const todoLength =  computed(()=> props.todoList.length);

        return {todoLength}

    },
};

</script>