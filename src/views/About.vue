<template>
  <div>
    <TodoList :todo-list="todoList"></TodoList>
  </div>
</template>
<script>
import TodoList from '../components/TodoList.vue'

export default {
  components: {
    TodoList
  },
  data () {
    return {}
  },
  computed: {
    todoList () {
      return this.$store.getters.getTodoList
    }
  }
}
</script>

<style scoped>
div {
  width: 50%;
  margin: 0 auto;
}
</style>
