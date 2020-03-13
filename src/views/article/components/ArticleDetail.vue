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
                <el-col :span="5">
                  <el-form-item label-width="60px" prop="categoryId" label="分类:" class="postInfo-container-item">
                    <el-select v-model="tagsId" multiple placeholder="请选择">
                      <el-option
                        v-for="item in tags"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label-width="60px" prop="isTop" label="置顶:" class="postInfo-container-item">
                    <el-switch
                      v-model="articleForm.isTop"
                      :active-value="1"
                      :inactive-value="0"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" prop="description" label-width="55px" label="摘要:">
          <el-input v-model="articleForm.description" :rows="1" type="textarea" class="article-textarea" autosize placeholder="输入摘要" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-upload
          ref="uploadThumb"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadThumb"
          :auto-upload="false"
          :multiple="false"
          :on-change="handleChange"
          :file-list="fileList"
          :on-remove="handleRemove"
          class="upload-avatar"
          action=""
          list-type="picture-card"
          accept="image/*"
        >
          <el-button size="small">
            选择一个缩略图吧~
          </el-button>
        </el-upload>

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
import { getArticleById, createArticle, updateArticle, uploadThumb } from '@/api/article/article'
import { fetchTagList } from '@/api/article/tags'

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
      // articleForm: Object.assign({}, defaultForm),
      content: content,
      loading: false,
      userListOptions: [],
      pageStatus: this.isEdit,
      categoryList: [], // 文章分类列表
      tags: [], // 标签列表
      fileList: [],
      tagsId: [],
      articleForm: {
        id: '',
        title: '',
        description: '',
        isPublic: '',
        categoryId: '',
        tagsId: '',
        isTop: 0,
        createAt: '',
        image: '',
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
    this.fetchTagList()
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
    fetchTagList() {
      fetchTagList().then(response => {
        if (response.data) {
          this.tags = response.data.results
        }
      })
    },

    getArticleById(id) {
      getArticleById(id).then(response => {
        this.tagsId = response.data.tags.map(x => { return x.id })
        // 缩略图处理
        this.fileList.push({
          name: 'food.jpeg',
          url: response.data.image
        })
        this.$refs['uploadThumb'].$el.style.setProperty('--upload-avatar-display', 'none')

        this.articleForm = response.data
        // Set tagsview title
        this.setTagsViewTitle()
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
          if (!this.articleForm.image) {
            this.$message({
              message: '请上传缩略图。',
              type: 'error'
            })
            return false
          }
          if (this.$refs['markdownEditor'].getValue().length <= 0) {
            this.$message({
              message: '请填写文章内容。',
              type: 'error'
            })
            return false
          }
          this.articleForm.tagsId = this.tagsId.join(',')

          if (!this.pageStatus) {
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
    },
    /**
     * 限制只能上传一张缩略图，选择完一张后删除选择按钮
     */
    handleChange(file, fileList) {
      this.$refs['uploadThumb'].$el.style.setProperty('--upload-avatar-display', 'none')
      this.$refs.uploadThumb.submit()
    },
    handleRemove(file, fileList) {
      this.$refs['uploadThumb'].$el.style.setProperty('--upload-avatar-display', 'grid')
    },
    /**
     * 上传文件之前的钩子
     */
    beforeAvatarUpload(file) {
      const isIMG = file.type.substring(0, 5) === 'image'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isIMG) {
        this.$message.error('上传缩略图图片只能是图片!')
      }
      if (!isLt2M) {
        this.$message.error('上传缩略图图片大小不能超过 2MB!')
      }
      return isIMG && isLt2M
    },
    uploadThumb(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('name', item.file.name)
      formData.append('uid', item.file.uid)
      formData.append('type', 'SKU')
      uploadThumb(formData).then(res => {
        this.articleForm.image = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.createPost-container {
    --upload-avatar-display: grid;
  .el-upload {
    display: grid;
  }
  .upload-avatar > .el-upload--picture-card {

    margin-bottom: 1em;
    display: var(--upload-avatar-display);
  }
  .upload-pard {
    .diy-avatar {
      .col-avatar-list {
        border-right: 1px solid #dcdfe6;
        img {
          margin: 0.5rem;
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
      }
      .col-avatar-preview {
        margin-top: 1em;
        padding-left: 1em;
        .el-image {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        img {
          width: 100px;
          height: 100px;
        }
        p {
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
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
