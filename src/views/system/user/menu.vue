<template>
  <!-- 菜单列表 -->
  <div class="app-container">
    <el-header style="padding:0 0 0 0px;">
      <div class="filter-container">
        <el-input v-model="listQuery.name" prefix-icon="el-icon-search" style="width: 150px;" class="filter-item" placeholder="菜单名称" clearable @keyup.enter.native="getRightList" />
        <!--  @click="getRightList" -->
        <el-button class="filter-item" type="primary" icon="el-icon-search" plain @click="getList">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus" plain @click="handleCreate">
          添加
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" plain @click="handleDelete">
          删除
        </el-button>
      </div>
    </el-header>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" row-key="id" @selection-change="changeFun">
      <el-table-column prop="id" label="id" align="center" type="selection" />
      <el-table-column prop="name" label="菜单名称" align="left" header-align="center">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" style="color:#9e9399!important" />
          <svg-icon v-else icon-class="" style="color:#9e9399!important" />
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column prop="path" label="组件路径" align="center" />
      <el-table-column prop="url" label="请求地址" align="center" />
      <el-table-column prop="code" label="权限标识" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column :formatter="common.dateFormat" prop="createAt" label="创建时间" align="center" />
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <div v-for="resourceType in $store.getters.resourceType" :key="resourceType.value">
            <el-tag
              v-if="scope.row.type == resourceType.value"
              :key="resourceType.value"
              :type="resourceType.type"
            >
              {{ resourceType.label }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editMenu(scope.row.id)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 模态框 -->
    <el-dialog :title="dialogTitleFilter(dialogStatus)" :visible.sync="menuDialog" @close="closeEvent('resource')">
      <el-form ref="resource" :rules="menuRules" :model="resource" lstatus-icon abel-position="right" label-width="8em">
        <el-form-item prop="id" style="display:none;">
          <el-input v-model="resource.id" type="hidden" />
        </el-form-item>

        <el-form-item label="菜单名称:" prop="name">
          <el-input v-model="resource.name" auto-complete="off" />
        </el-form-item>

        <el-form-item label="类型:" prop="type">
          <el-radio-group v-model="resource.type">
            <el-radio label="1">
              菜单
            </el-radio>
            <el-radio label="2">
              目录
            </el-radio>
            <el-radio label="3">
              按钮
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-show="!isButton">
          <el-form-item label="组件路径:" prop="component">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                <el-alert
                  :closable="false"
                  style="height: 0px;background-color:inherit"
                  title="请确保该资源(组件)路径真实存在"
                  type="warning"
                  show-icon
                />
              </div>
              <el-input v-model="resource.component" auto-complete="off" placeholder="template/template" />
            </el-tooltip>
          </el-form-item>

          <el-form-item label="访问路径:" prop="path">
            <el-input v-model="resource.path" auto-complete="off" placeholder="path" />
          </el-form-item>
        </div>

        <div v-show="!isMenu">
          <el-form-item label="请求地址:" prop="url">
            <el-tooltip class="item" effect="dark" placement="top-start">
              <div slot="content">
                <el-alert
                  :closable="false"
                  style="height: 0px;background-color:inherit"
                  title="多个地址逗号（,）隔开"
                  type="warning"
                  show-icon
                />
              </div>
              <el-input v-model="resource.url" placeholder="请输入内容">
                <template slot="prepend">
                  http://localhost:9527
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>

          <el-form-item label="请求方式:" prop="method">
            <el-radio-group v-model="resource.method">
              <el-radio label="GET">
                GET
              </el-radio>
              <el-radio label="PUT">
                PUT
              </el-radio>
              <el-radio label="POST">
                POST
              </el-radio>
              <el-radio label="DELETE">
                DELETE
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="权限标识:" prop="code">
            <el-input v-model="resource.code" auto-complete="off" placeholder="code" />
          </el-form-item>
        </div>

        <!-- 内部弹框选择图标 -->
        <el-dialog :visible.sync="innerVisible" append-to-body>
          <el-row class="icons-container">
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <el-form-item label="图标：" prop="icon">
                  <div class="icons-wrapper" style="border: 1px solid #eaeefb;">
                    <i
                      v-for="item of iconsMap"
                      :key="item"
                      style="font-size: 32px;    margin: 8px; border-right: 1px solid #eee;
                      border-bottom: 1px solid #eee;"
                      @click="handleCheck(item,$event)"
                    >
                      <svg-icon
                        :icon-class="item"
                        class-name="disabled"
                      />
                    </i>
                  </div>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-dialog>

        <el-form-item label="选择图标：" prop="icon">
          <div class="icon-form-item">
            <svg-icon :icon-class="resource.icon" />
          </div>
          <el-button type="primary" @click="innerVisible = true">
            选择图标
          </el-button>
        </el-form-item>

        <el-form-item v-if="dialogStatus === 'create'" label="父级资源：" prop="parentId">
          <el-input :value="parentName" disabled auto-complete="off" />
          <el-tree :data="parentTreeData" :props="defaultProps" :expand-on-click-node="false" @node-click="handleNodeClick" />
        </el-form-item>

        <el-form-item label="排序：" prop="sort">
          <el-input-number v-model="resource.sort" size="small" />
        </el-form-item>

        <el-form-item label="是否隐藏：" prop="hidden">
          <el-switch
            v-model="resource.hidden"
            :active-value="true"
            :inactive-value="true"
          />
        </el-form-item>

        <el-form-item label="描述：" prop="description">
          <el-input v-model="resource.description" :autosize="{ minRows: 3, maxRows: 5}" type="textarea" auto-complete="off" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialog = false">
          取 消
        </el-button>
        <el-button type="primary" @click="saveMenu">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { fetchResourceList, deleteMenu, getMenuById, createMenu, updateMenu } from '@/api/user/resource'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import icons from '@/utils/requireIcons' // 获取icons下所有svg文件

export default {
  name: 'Menu',
  data() {
    return {
      innerVisible: false,
      iconsMap: icons,
      list: [],
      listLoading: true,
      listQuery: {
        name: ''
      },
      /**
     * 树形列表默认树形
     */
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 数据状态下拉选择
      dataState: this.$store.getters.dataState,
      // 选中的行
      multipleSelection: [],
      // dialog是否显示
      menuDialog: false,
      // TODO 显示dialog标题,该字段必须存在
      dialogStatus: '',
      // 编辑或者新增dialog是否显示时间
      createDateisShow: '',
      parentTreeData: [], // 树形菜单
      parentName: '', // 表单冗余字段
      // 模态框表单
      resource: {
        id: '',
        name: '', // 资源名称
        path: '', // 资源路径
        component: '', // 组件
        icon: '', // 图标
        description: '', // 描述
        parentId: '', // 父级资源
        createAt: '', // 创建时间
        hidden: '', // 是否隐藏
        sort: '', // 排序
        method: '', // 请求方法
        type: '', // btn 或menu
        url: '', // 请求url，{跟path不同，path为vue的组件请求路径，url是网络请求路径}
        code: '' // 资源标识
      },
      // dialog表单中验证规则写这里
      menuRules: {
        name: [
          { required: true, message: '请输入资源名称:', trigger: 'blur' },
          { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          /* { pattern: /^[^\#\$\*\<\>\$\^\&\/\\]*$/, message: '包含特殊字符,请重新输入' } */
        ],
        /* resourceIcon: [
          { required: true, message: '请输入图标', trigger: 'blur' }
        ], */

        resourceDesc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        parentResource: [{ required: true, message: '请输入父级资源', trigger: 'blur' }]
      }
    }
  },
  // 注册组件
  // components: { Pagination },
  computed: {
    isMenu() {
      return this.resource.type === '1'
    },
    isButton() {
      return this.resource.type === '3'
    }

  },

  created() {
    this.getList()
  },

  methods: {

    /**
     * 生成icon 标签
     */
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    // 编辑
    editMenu(id) {
      getMenuById(id).then(response => {
        // response.data.createAt = parseTime(response.data.createAt)
        // 表单内树选中
        /* this.tempTreeDataTest.map(data => {
          if (data.id === response.data.parentid) {
            this.parentLabel = data.title
          }
        }) */
        this.dialogStatus = 'update'
        this.createDateisShow = true
        this.menuDialog = true

        this.$nextTick(() => { // https://github.com/ElemeFE/element/issues/1871
          this.resource = response.data
          this.parentTreeData.map(data => {
            if (data.id.toString() === response.data.parentId) {
              this.parentName = data.name
            }
          })
        })
      }).catch()
    },

    /**
     * 查询菜单列表
     */
    getList() {
      this.listLoading = true
      fetchResourceList(this.listQuery).then(response => {
        if (response.data) {
          this.list = this.common.converToTree(response.data, '0')
        }
        this.listLoading = false
      })
    },
    // 保存
    saveMenu() {
      this.$refs['resource'].validate((valid) => {
        if (valid) {
          if (this.dialogStatus === 'create') {
            this.resource.parentId === '' ? this.resource.parentId = '0' : ''
            createMenu(this.resource).then(data => {
              this.menuDialog = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {

            })
          } else {
            updateMenu(this.resource).then(data => {
              this.menuDialog = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {

            })
          }
        } else {
          this.$message({
            message: '请正确填写表单！',
            type: 'warning'
          })
          return false
        }
      })
    },
    /**
     * 删除菜单
     */
    handleDelete() {
      const sel = this.multipleSelection.map(x => x.id)
      if (!sel.length) {
        return this.$message({ message: '请选择要删除的数据', type: 'warning' })
      }

      this.$confirm('您确认您要删除选择的数据吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
        deleteMenu(sel).then(data => {
          this.$message({ message: '操作成功', type: 'success' })
          this.listQuery.pageNum = 1
          this.getList()
        })
      }).catch((error) => {
        console.log('menu-->handleDelete删除失败：' + error)
      })
    },

    /**
     * 添加菜单
     */
    handleCreate() {
      // 表单内树
      this.parentTreeData = this.list
      this.dialogStatus = 'create'
      this.menuDialog = true
      // this.$refs['resource'].clearValidate()
    },

    /**
     * 模态框关闭事件
     */
    closeEvent(key) {
      this.$refs[key].resetFields()
    },
    // 显示gialog的标题
    dialogTitleFilter(val) {
      const value = this.$store.getters.dialogTitleText(val)
      return value
    },
    /**
     * 复选框change事件
     */
    changeFun(selection) {
      this.multipleSelection = selection
    },

    /**
     * 选择icon图标回调
     */
    handleCheck(icon, event) {
      this.resource.icon = icon
      this.innerVisible = false
    },
    /**
     * 选择树形表单事件
     */
    handleNodeClick(data) {
      this.resource.parentId = data.id
      this.parentName = data.name
    },
    // pageSize变更事件
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.pageNum = 1
      this.getList()
    },
    // 当前页变更事件
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}

.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
  .disabled{
    pointer-events: none;
  }
}

  .icon-form-item {
    text-align: center;
    width: 50px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }
</style>
