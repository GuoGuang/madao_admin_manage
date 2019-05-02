<template>
  <div class="createPost-container">
    <el-form ref="articleForm" :model="articleForm" :rules="articleRules" class="form-container">
      <sticky :class-name="'sub-navbar '+postForm.status">
        <CommentDropdown v-model="postForm.comment_disabled" />
        <PlatformDropdown v-model="postForm.platforms" />
        <SourceUrlDropdown v-model="postForm.source_uri" />
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">草稿</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>

          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="articleForm.title" :maxlength="100" name="name">
                输入文章标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>

                <el-col :span="5">
                  <el-form-item label-width="80px" label="文章类型:" class="postInfo-container-item">
                    <el-select v-model="articleForm.origin" placeholder="请选择">
                      <el-option
                        v-for="articleOrigin in $store.getters.articleOrigin"
                        :key="articleOrigin.value"
                        :value="articleOrigin.value"
                        :label="articleOrigin.label"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="60px" label="分类:" class="postInfo-container-item">
                    <el-select v-model="articleForm.categoryId" placeholder="请选择">
                      <el-option
                        v-for="category in categoryList"
                        :key="category.id"
                        :value="category.id"
                        :label="category.name"/>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="5">
                  <el-form-item label-width="60px" label="标签:" class="postInfo-container-item">
                    <el-select
                      v-model="articleForm.label"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="最多添加5个标签"/>
                  </el-form-item>
                </el-col>

                <el-col :span="2">
                  <el-form-item label-width="60px" label="置顶:" class="postInfo-container-item">
                    <el-switch
                      v-model="articleForm.isPublic"
                      active-color="#13ce66"
                    />
                  </el-form-item>
                </el-col>
                <!--
                <el-col :span="4">
                  <el-form-item label-width="60px" label="置顶:" class="postInfo-container-item">
                    <el-rate
                      v-model="articleForm.isTop"
                      :max="3"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      :low-threshold="1"
                      :high-threshold="3"
                      style="margin-top:8px;"/>
                  </el-form-item>
                </el-col> -->

              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input :rows="1" v-model="articleForm.description" type="textarea" class="article-textarea" autosize placeholder="输入摘要"/>
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="postForm.content" />
        </div>

        <div style="margin-bottom: 20px;">
          <Upload v-model="postForm.image_uri" />
        </div>
      </div>
    </el-form>

  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { validateURL } from '@/utils/validate'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { fetchCategoryList } from '@/api/article/category'
import { getArticleById, createArticle, updateArticle } from '@/api/article/article'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput, Upload, Sticky, Warning, CommentDropdown, PlatformDropdown, SourceUrlDropdown },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      pageStatus: '',
      categoryList: [], // 文章分类列表
      articleForm: {
        id: '',
        title: '',
        description: '',
        isPublic: '',
        categoryId: '',
        label: '',
        isTop: 0,
        createAt: '',
        origin: ''
      },
      articleRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
          /* { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' } */
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
          /*  { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' } */
        ]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    }
  },

  created() {
    this.getCategoryList()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    /**
     * 获取文章分类信息
     */
    getCategoryList() {
      fetchCategoryList().then(response => {
        if (response.data) {
          this.categoryList = response.data.records
        }
      })
    },

    fetchData(id) {
      getArticleById(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('updateVisitedView', route)
    },

    /**
     * 提交表单：发布文章
     */
    submitForm() {
      this.articleForm.label = this.articleForm.label === '' ? '' : this.articleForm.label.split(',')
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          if (!this.pageStatus) {
            createArticle(this.articleForm).then(data => {
              this.articleDialog = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              // TODO 发布成功页面
            }).catch(response => {
              this.$message({
                message: '请求出错,请稍后重试!',
                type: 'error'
              })
            })
          } else {
            updateArticle(this.articleForm).then(data => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getList()
            }).catch(response => {
              this.$message({
                message: '请求出错,请稍后重试!',
                type: 'error'
              })
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
     * 草稿表单：存为草稿
     */
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },

    getRemoteUserList(query) {
      userSearch(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 10px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
