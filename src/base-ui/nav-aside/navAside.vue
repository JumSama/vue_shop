<template>
  <div class="nav-aside">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#333333"
      text-color="#fff"
      unique-opened
      :collapse-transition="false"
      router
    >
      <div class="triger-collapse" @click="changeCollapse">|||</div>
      <!-- 一级菜单 -->
      <el-submenu
        :index="'/' + item.path"
        v-for="item in menuList"
        :key="item.id"
      >
        <template slot="title">
          <i :class="iconList[item.id]"></i>
          <span slot="title" class="title">{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="'/' + subItem.path"
          v-for="subItem in item.children"
          :key="subItem.id"
        >
          <!-- 图标 -->
          <i class="el-icon-menu"></i>
          <!-- 文本 -->
          <span>{{ subItem.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    menuList: Array,
    iconList: Object
  },
  emits: ['isCollapse'],
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    /**
     * 打开关闭事件
     * @param {*} key
     * @param {*} keyPath
     */
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    /**
     * 侧边栏折叠
     */
    changeCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('isCollapse', this.isCollapse)
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.title {
  margin: 0 10px;
}

.triger-collapse {
  background-color: #666666;
  color: white;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
</style>
