<template>
  <div class="container">
    <h3 class="text-center">ToDo App</h3>
    <hr my-2 />
    <AddSection :addNewTodo="addNewTodo" @add-todo="addNewTodo" />
    <ListSection  />
  </div>
</template>

<script>
import AddSection from "@/components/AddSection";
import ListSection from "@/components/ListSection";
// import TodoList from "@/components/TodoList";
// import ResultBar from "@/components/ResultBar";

export default {
  components: {
    AddSection,
    ListSection,
    // TodoList,
    // ResultBar,
  },
  created() {
    // setTimeout(() => {
    //   this.todoList = [
    //     { id: 1, text: "Bootcamp #2" },
    //     { id: 2, text: "Bootcamp #2.1" },
    //     { id: 3, text: "Bootcamp #2.2" },
    //     { id: 4, text: "Bootcamp #2.3" },
    //     { id: 5, text: "Bootcamp #2.4" },
    //     { id: 6, text: "Bootcamp #2.5" },
    //   ];
    // }, 2000);
  },
  data() {
    return {
      provideData: {
        todoList: [
          { id: 1, text: "Bootcamp #2" },
          { id: 2, text: "Bootcamp #2.1" },
          { id: 3, text: "Bootcamp #2.2" },
          { id: 4, text: "Bootcamp #2.3" },
          { id: 5, text: "Bootcamp #2.4" },
          { id: 6, text: "Bootcamp #2.5" },
        ],
      },
    };
  },
  provide() {
    return {
      provideData: this.provideData,
      deleteItem: this.deleteItem,
    };
  },
  methods: {
    testEvent(data) {
      alert(data);
    },
    deleteItem(item) {
      this.provideData.todoList = this.provideData.todoList.filter((t) => t != item);
    },
    addNewTodo(todo) {
      this.provideData.todoList.push({
        id: new Date().getTime(),
        text: todo,
      });
      //todo.target.value = "";
    },
  },
};
</script>
