<template>
  <el-container class="home-container">
    <el-header>
      <nav-header @logout="logout"></nav-header>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <nav-aside
          :menuList="menuList"
          :iconList="iconList"
          @isCollapse="payload => (isCollapse = payload)"
        ></nav-aside>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import navAside from '../base-ui/nav-aside/navAside.vue'
import navHeader from '../base-ui/nav-header/navHeader.vue'
export default {
  components: {
    navAside,
    navHeader
  },
  data() {
    return {
      menuList: [],
      iconList: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    /**
     * 注销
     */
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },

    /**
     * 获取侧边栏菜单
     */
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
}

.el-aside {
  background-color: #333333;
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}
</style>
