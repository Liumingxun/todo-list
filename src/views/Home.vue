<template>
  <div class="home">
    <TodoList :todo-list="todoList"></TodoList>
  </div>
</template>

<script>
// @ is an alias to /src

import TodoList from '@/components/TodoList'
export default {
  name: 'Home',
  components: {
    TodoList
  },
  computed: {
    todoList () {
      return this.$store.getters.getTodoList
    }
  }
}
</script>

<style scoped>
.home {
  width: 50%;
  margin: 0 auto;
}
</style>
