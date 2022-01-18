import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [
      {
        id: 0,
        done: false,
        desc: 'This is a todo item!',
        dateTime: 1642509547,
        deadline: new Date().getTime() + 20000
      },
      {
        id: 1,
        done: true,
        desc: 'This is a todo item!Cur cedrium peregrinationes?',
        dateTime: 1642509547,
        deadline: new Date().getTime() + 20000
      }
    ]
  },
  mutations: {
    addTodoItem (state, todoItem) {
      state.todoList.push(todoItem)
    },
    changeState (state, id) {
      state.todoList[id].done === true
        ? state.todoList[id].done = false
        : state.todoList[id].done = true
    }
  },
  actions: {},
  modules: {},
  getters: {
    getTodoList: state => {
      return state.todoList
    },
    getTodoListLength: (state, getters) => {
      return getters.getTodoList.length
    }
  }
})
