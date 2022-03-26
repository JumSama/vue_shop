import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 原型挂载message组件, 高版本elementUI自动挂载消息组件
Vue.prototype.$message = Message
