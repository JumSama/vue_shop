<template>
  <div class="nav-header">
    <div class="nav-brand">
      <img src="../../assets/logo.png" alt="logo" width="44px" height="44px" />
      <span>电商后台管理系统</span>
    </div>
    <div>
      <el-button type="primary" @click="emitLogout">注销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['logout'],
  methods: {
    emitLogout() {
      this.emits('logout')
    }
  }
}
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  font-size: large;
  color: white;
}
</style>
