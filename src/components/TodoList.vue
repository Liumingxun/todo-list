<template>
  <div>
    <div class="addTodoItem">
      <ElButton type="primary" style="width: 100%; padding: 15px; font-size: 2em" @click="modal = true">添加Todo
      </ElButton>
    </div>
    <div class="showTodoList">
      <ElTabs type="border-card" active-name="all" stretch>
        <ElTabPane label="全部" name="all">
          <div v-for="todoItem in todoList" :key="todoItem.id">
            <ElCard shadow="hover" :body-style="{ textAlign: 'left' }">
              <ElCheckbox style="width: 100%" :checked="todoItem.done" @change="changeState(todoItem.id)">
                <span
                  :style="{ textDecoration: todoItem.done === true ? 'line-through' : 'none' }">{{ todoItem.desc }}</span>
              </ElCheckbox>
            </ElCard>
          </div>
        </ElTabPane>
        <ElTabPane label="未完成" name="unchecked">
          <div v-for="todoItem in filterTodoList(false)" :key="todoItem.id">
            <ElCard shadow="hover" :body-style="{ textAlign: 'left' }">
              <ElCheckbox style="width: 100%" :checked="todoItem.done" @change="changeState(todoItem.id)">
                <span
                  :style="{ textDecoration: todoItem.done === true ? 'line-through' : 'none' }">{{ todoItem.desc }}</span>
              </ElCheckbox>
            </ElCard>
          </div>
        </ElTabPane>
        <ElTabPane label="已完成" name="checked">
          <div v-for="todoItem in filterTodoList(true)" :key="todoItem.id">
            <ElCard shadow="hover" :body-style="{ textAlign: 'left' }">
              <ElCheckbox style="width: 100%" :checked="todoItem.done" @change="changeState(todoItem.id)">
                <span
                  :style="{ textDecoration: todoItem.done === true ? 'line-through' : 'none' }">{{ todoItem.desc }}</span>
              </ElCheckbox>
            </ElCard>
          </div>
        </ElTabPane>
      </ElTabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todoList: []
  },
  data () {
    return {
      modal: false,
      todoItem: {}
    }
  },
  computed: {},
  methods: {
    timestampFormat (timestamp) {
      function zeroize (num) {
        return (String(num).length === 1 ? '0' : '') + num
      }

      const curTimestamp = Math.trunc(new Date().getTime() / 1000) // 当前时间戳
      const timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数

      const curDate = new Date(curTimestamp * 1000) // 当前时间日期对象
      const tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象

      const Y = tmDate.getFullYear()
      const m = tmDate.getMonth() + 1
      const d = tmDate.getDate()
      const H = tmDate.getHours()
      const i = tmDate.getMinutes()

      if (timestampDiff < 60) { // 一分钟以内
        return '刚刚'
      } else if (timestampDiff < 3600) { // 一小时前之内
        return Math.floor(timestampDiff / 60) + '分钟前'
      } else if (curDate.getFullYear() === Y && curDate.getMonth() + 1 === m && curDate.getDate() === d) {
        return '今天' + zeroize(H) + ':' + zeroize(i)
      } else {
        const newDate = new Date((curTimestamp - 86400) * 1000) // 参数中的时间戳加一天转换成的日期对象
        if (newDate.getFullYear() === Y && newDate.getMonth() + 1 === m && newDate.getDate() === d) {
          return '昨天' + zeroize(H) + ':' + zeroize(i)
        } else if (curDate.getFullYear() === Y) {
          return zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
        } else {
          return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i)
        }
      }
    },
    changeState (id) {
      this.$store.commit('changeState', id)
    },
    filterTodoList (state) {
      return this.todoList.filter(item => item.done === state)
    },
    addTodoItem () {
      this.$store.commit('addTodoItem', this.todoItem)
    }
  }
}
</script>

<style scoped>
.addTodoItem {
  margin-bottom: 5px;
}
</style>
