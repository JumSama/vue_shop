import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Aside,
  Main,
  Header,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu
} from 'element-ui'

const elConponents = [
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Aside,
  Main,
  Header,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup
]

elConponents.forEach(el => {
  Vue.use(el)
})

// 原型挂载message组件, 高版本elementUI自动挂载消息组件
Vue.prototype.$message = Message
