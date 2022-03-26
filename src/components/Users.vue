<template>
  <div class="users-page">
    <breadcrumb :crumbList="crumbList"></breadcrumb>
    <card>
      <template #default>
        <!-- 输入区域 -->
        <el-row :gutter="20">
          <el-col :span="7"
            ><el-input
              placeholder="请输入内容"
              v-model="queryInfo.query"
              @clear="getUserList"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button> </el-input
          ></el-col>
          <el-col :span="6"></el-col>
        </el-row>
        <!-- 用户列表区域 -->
        <el-table :data="userList" style="width: 100%" stripe border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="changeUserState(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
              <!-- 分配角色按钮 -->

              <el-tooltip
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="true"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                ></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页栏 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 4, 8, 16]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </template>
    </card>
  </div>
</template>

<script>
import Breadcrumb from '../base-ui/Breadcrumb/Breadcrumb.vue'
import Card from '../base-ui/Card/Card.vue'
export default {
  components: { Breadcrumb, Card },
  data() {
    return {
      crumbList: [
        {
          name: '用户列表',
          path: '/users'
        }
      ],
      queryInfo: {
        query: '',
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 1
      },
      userList: [],
      total: 1,
      currentPage: 1
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    /**
     * 获取用户列表
     */
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) return this.$message.error('数据获取失败')
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res.data)
    },

    /**
     * 获取最新数据长度
     * @param {*} size
     */
    handleSizeChange(size) {
      this.queryInfo.pagesize = size
      this.getUserList()
    },

    /**
     * 获取当前页面值
     * @param {当前页} page
     */
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page
      this.getUserList()
    },

    /**
     * 更改用户状态
     * @param {用户信息} info
     */
    async changeUserState(info) {
      console.log(info)
      const { data: res } = await this.$http.put(
        `users/${info.id}/state/${info.mg_state}`
      )
      if (res.meta.status !== 200) {
        info.mg_state = !info.mg_state
        return this.$message.error('修改状态失败!')
      }
      this.$message.success('更新用户状态成功!')
    }
  }
}
</script>

<style lang="less" scoped></style>
