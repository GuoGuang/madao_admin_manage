<template>
  <div class="createPost-container">
    <el-form ref="articleForm" :model="articleForm" :rules="articleRules" status-icon class="form-container">
      <!-- <sticky :class-name="'sub-navbar '+articleForm.status"> -->
      <sticky :class-name="'sub-navbar '">
        <!-- <CommentDropdown v-model="articleForm.comment_disabled" />
        <PlatformDropdown v-model="articleForm.platforms" />
        <SourceUrlDropdown v-model="articleForm.source_uri" /> -->
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          发布
        </el-button>
        <el-button v-loading="loading" type="warning" @click="draftForm">
          草稿
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />

          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="articleForm.title" :maxlength="100">
                文章标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="6">
                  <el-form-item label-width="95px" prop="origin" label="文章类型：" class="postInfo-container-item">
                    <el-select v-model="articleForm.origin" placeholder="请选择">
                      <el-option
                        v-for="articleOrigin in $store.getters.articleOrigin"
                        :key="articleOrigin.value"
                        :value="articleOrigin.value"
                        :label="articleOrigin.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label-width="60px" prop="categoryId" label="分类:" class="postInfo-container-item">
                    <el-select v-model="articleForm.categoryId" placeholder="请选择">
                      <el-option
                        v-for="category in categoryList"
                        :key="category.id"
                        :value="category.id"
                        :label="category.name"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="5">
                  <el-form-item label-width="60px" label="标签:" class="postInfo-container-item">
                    <el-select
                      v-model="articleForm.label"
                      multiple
                      filterable
                      allow-create
                      default-first-option
                      placeholder="最多添加5个标签"/>
                  </el-form-item>
                </el-col> -->

                <el-tag
                  v-for="(tag,key) in labelTags"
                  :key="key"
                  :disable-transitions="false"
                  closable
                  @close="handleTagClose(tag)"
                >
                  {{ tag.name }}
                </el-tag>
                <!-- <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="tagInputValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                /> -->

                <el-select
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="tagInputValue"
                  placeholder="请选择"
                  @change="handleInputConfirm"
                >
                  <el-option
                    v-for="item in tags"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  />
                </el-select>

                <el-button v-else class="button-new-tag" size="small" @click="showInput">
                  + 新标签
                </el-button>

                <el-col :span="2">
                  <el-form-item label-width="60px" prop="isTop" label="置顶:" class="postInfo-container-item">
                    <el-switch
                      v-model="articleForm.isTop"
                      :active-value="1"
                      :inactive-value="0"
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

        <el-form-item style="margin-bottom: 40px;" prop="description" label-width="55px" label="摘要:">
          <el-input v-model="articleForm.description" :rows="1" type="textarea" class="article-textarea" autosize placeholder="输入摘要" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <div class="editor-container">
          <!-- <Tinymce ref="editor" :height="400" v-model="articleForm.content" /> -->
          <markdown-editor id="markdownEditor" ref="markdownEditor" v-model="articleForm.content" :language="language" :height="740" :z-index="20" />
        </div>

        <!--  <div style="margin-bottom: 20px;">
          <Upload v-model="articleForm.image_uri" />
        </div> -->
      </div>
    </el-form>
  </div>
</template>

<script>
// import Tinymce from '@/components/Tinymce'
import MarkdownEditor from '@/components/MarkdownEditor'

// import Upload from '@/components/Upload/singleImage3'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
// import { validateURL } from '@/utils/validate'
import { userSearch } from '@/api/remoteSearch'
import Warning from './Warning'
// import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'
import { fetchCategoryList } from '@/api/article/category'
import { getArticleById, createArticle, updateArticle } from '@/api/article/article'
import { fetchTags } from '@/api/article/tags'

/* const defaultForm = {
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
} */

const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`

export default {
  name: 'ArticleDetail',
  components: {
    // Tinymce,
    MDinput,
    // Upload,
    Sticky,
    Warning,
    // CommentDropdown,
    // PlatformDropdown,
    // SourceUrlDropdown,
    MarkdownEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      options: [{
        value: '1',
        label: '黄金糕'
      }, {
        value: '2',
        label: '双皮奶'
      }, {
        value: '3',
        label: '蚵仔煎'
      }, {
        value: '4',
        label: '龙须面'
      }, {
        value: '5',
        label: '北京烤鸭'
      }],

      // articleForm: Object.assign({}, defaultForm),
      content: content,
      loading: false,
      userListOptions: [],
      pageStatus: this.isEdit,
      categoryList: [], // 文章分类列表
      tags: [], // 标签列表
      inputVisible: false,
      tagInputValue: '',
      labelTags: [],
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
        ],
        origin: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
          /*  { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' } */
        ],
        categoryId: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
          /*  { pattern: /^([\w\d]){4,15}$/, message: '以字母开头，长度6-15之间，必须包含字母、数字' } */
        ]
      },
      tempRoute: {},
      languageTypeList: {
        'en': 'en_US',
        'zh': 'zh_CN',
        'es': 'es_ES'
      }
    }
  },
  computed: {
    contentShortLength() {
      return this.articleForm.description ? this.articleForm.description.length : 0
    },
    lang() {
      return this.$store.getters.language
    },
    language() {
      return this.languageTypeList['zh']
    }
  },

  created() {
    this.getCategoryList()
    this.fetchTags()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getArticleById(id)
    } else {
      // this.articleForm = Object.assign({}, defaultForm)
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
          this.categoryList = response.data.results
        }
      })
    },

    /**
     * 获取标签分类信息
     */
    fetchTags() {
      fetchTags().then(response => {
        if (response.data) {
          this.tags = response.data.results
        }
      })
    },

    /**
   * 删除标签事件
   */
    handleTagClose(tag) {
      this.labelTags.splice(this.labelTags.indexOf(tag.id), 1)
    },

    /**
     * 显示新标签输入框
     */
    showInput() {
      this.inputVisible = true
    },
    /**
       * 输入框添加新标签回调
       */
    handleInputConfirm(event) {
      console.log(event)
      // 重复
      if (event) {
        this.labelTags.push(event)
      }
      this.inputVisible = false
      this.tagInputValue = ''
    },

    getArticleById(id) {
      getArticleById(id).then(response => {
        this.articleForm = response.data
        const tags = response.data.label.split(',')
        tags.forEach(tagsInfo => {
          this.tags.forEach(element => {
            if (element.id === tagsInfo) {
              this.labelTags.push(element)
            }
          })
        })
        // Set tagsview title
        this.setTagsViewTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.articleForm.title}` })
      this.$store.dispatch('updateVisitedView', route)
    },

    /**
     * 提交表单：发布文章
     */
    submitForm() {
      this.$refs['articleForm'].validate((valid) => {
        if (valid) {
          if (this.$refs['markdownEditor'].getValue().length <= 0) {
            this.$message({
              message: '请填写文章内容。',
              type: 'error'
            })
            return false
          }

          const tempLabelTags = []
          this.labelTags.forEach(element => { tempLabelTags.push(element.id) })
          this.articleForm.label = tempLabelTags.join(',')
          if (!this.pageStatus) {
            // this.articleForm.label = this.labelTags.join(',')
            createArticle(this.articleForm).then(data => {
              this.articleDialog = false

              this.$confirm('发布成功！', '提示', {
                confirmButtonText: '再写一篇',
                cancelButtonText: '查看文章',
                type: 'success'
              }).then(() => {
                this.$nextTick(() => {
                  this.$router.replace({
                    path: '/redirect/article/create'
                  })
                })
              }).catch(() => {
                this.$router.push({ path: '/article/list' })
              })

              // TODO 发布成功页面
            }).catch(response => {
              this.$message({
                message: response.message,
                type: 'error'
              })
            })
          } else {
            updateArticle(this.articleForm).then(data => {
              this.$confirm('修改成功！', '提示', {
                confirmButtonText: '再写一篇',
                cancelButtonText: '查看文章',
                type: 'success'
              }).then(() => {
                this.$nextTick(() => {
                  this.$router.replace({
                    path: '/redirect/article/create'
                  })
                })
              }).catch(() => {
                this.$router.push({ path: '/article/list' })
              })
            }).catch(response => {
              this.$message({
                message: response.message,
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
      if (this.articleForm.content.length === 0 || this.articleForm.title.length === 0) {
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
      this.articleForm.status = 'draft'
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

.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

</style>
