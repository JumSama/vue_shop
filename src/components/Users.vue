<template>
  <div class="users-page">
    <breadcrumb :crumbList="crumbList"></breadcrumb>
    <card>
      <template #default>
        <!-- 输入区域 -->
        <el-row :gutter="20">
          <el-col :span="8"
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
          <el-col :span="4"
            ><el-button type="primary" @click="showAddDialog"
              >添加用户</el-button
            ></el-col
          >
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
                @click="showEditDialog(scope.row)"
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

        <!-- 添加用户对话框 -->
        <el-dialog
          title="添加用户"
          @close="resetForm"
          :visible.sync="addDialogVisible"
          width="45%"
        >
          <!-- 内容主体区域 -->
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addFormRef"
            label-width="88px"
          >
            <el-form-item prop="username" label="用户名">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <!-- 选择区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑用户对话框 -->
        <el-dialog
          title="编辑用户"
          :visible.sync="editDialogVisible"
          width="40%"
        >
          <el-form
            :model="editForm"
            :rules="editFormRules"
            ref="editFormRef"
            label-width="88px"
          >
            <el-form-item prop="username" label="用户名">
              <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </span>
        </el-dialog>
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
        // 查询参数
        query: '',
        // 第几页
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 1
      },
      // 用户列表
      userList: [],
      // 用户总数
      total: 1,
      // 当前页数
      currentPage: 1,
      // 显示添加对话框
      addDialogVisible: false,
      // 显示编辑对话框
      editDialogVisible: false,
      // 添加用户Form表单
      addForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      // 编辑用户Form表单
      editForm: {},
      // Form验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '请输入6-15位字符的密码',
            trigger: 'blur'
          }
        ],
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入用户联系方式', trigger: 'blur' }
        ]
      },
      // edittForm验证
      editFormRules: {
        email: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入用户联系方式', trigger: 'blur' }
        ]
      }
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
    },

    /**
     * 展示添加用户对话框
     */
    showAddDialog() {
      this.addDialogVisible = true
    },

    /**
     * 展示编辑用户对话框
     */
    async showEditDialog(payload) {
      const { data: res } = await this.$http.get(`users/${payload.id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败!')
      } else {
        this.editForm = res.data
        this.editDialogVisible = true
      }
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.addFormRef.resetFields()
    },

    /**
     * 添加用户
     */
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addForm)
        console.log(res)
        if (res.meta.status !== 201) {
          return this.$message.error('添加失败!')
        } else {
          this.$message.success('添加成功!')
          // 隐藏对话框
          this.addDialogVisible = false
          // 重新获取用户列表
          this.getUserList()
        }
      })
    },

    /**
     * 编辑用户信息
     */
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.$message.error('输入格式有误!')
        const { data: res } = await this.$http.put(
          'users/' + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        )
        if (res.meta.status !== 200) {
          this.editDialogVisible = false
          return this.$message.error('修改失败!')
        }
        this.$message.success('修改成功!')
        this.editDialogVisible = false
        this.getUserList()
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
