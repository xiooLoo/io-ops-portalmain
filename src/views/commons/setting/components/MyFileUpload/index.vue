<!--
 *  功能：  文件上传
 *  入参：
        limit:         [非必传]文件上传限制个数
        fileList:      [非必传]默认已上传文件列表
        fileTitle:     [非必传]文件上传按钮名称
        showFileList： [非必传]是否显示上传列表
 *  用法：
        import FileUpload from '@/components/FileUpload'
        ...
        <template>
            <FileUpload :limit="limit"  @on-remove="handleRemove" @on-success="handleSuccess" />
        </template>
        ...
        methods: {
         handleRemove(file,fileList){
             console.log(file,fileList)
         },
         handleSuccess(res,file,fileList){
             console.log(res,file,fileList)
         },
        }
-->
<template>
  <div>
    <to-upload
      ref="upload"
      class="upload-demo"
      :disabled="isDisable"
      :drag="isDrag"
      :action="newFileUrl?baseUrl+newFileUrl:fileUrl + urlSuffix"
      :headers="headers"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :before-upload="beforeAvatarUpload"
      :before-remove="beforeRemove"
      multiple
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :show-file-list="showFileList"
    >
      <slot name="btn" />
      <div v-if="isShowTip" slot="tip" class="to-upload__tip">只能上传{{ typeLimit.join('/') }}文件</div>
    </to-upload>
  </div>
</template>
<script>
// import { showLoading, hideLoading } from '@/yxtlib/utils/message.js'
import { getHeader } from '@/utils/cookies'

export default {
  name: 'MyFileUpload',
  props: {
    /**
     * 是否上传文件添加loading动效
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 是否重新配置上传文件格式
     */
    fileFormat: {
      type: Boolean,
      default: false
    },
    /**
    * 文件上传地址
    * 【非必传】
    */
    newFileUrl: {
      type: String,
      default: ''
    },
    urlSuffix: {
      type: String,
      default: 'official'
    },
    /**
     * 文件上传限制个数
     * 【非必传】
     */
    limit: {
      type: Number,
      default: 1
    },
    /**
     *  默认文件列表
     * 【非必传】
     */
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    /**
     *  名称
     * 【非必传】
     */
    fileTitle: {
      type: String,
      default: '附件上传'
    },
    /**
     *  是否显示上传列表
     * 【非必传】
     */
    showFileList: {
      type: Boolean,
      default: false
    },
    /**
     *  限制格式
     * 【非必传】
     */
    typeLimit: {
      type: Array,
      default: () => {
        return ['jpg', 'jpeg', 'png', 'txt', 'zip', 'rar', 'pdf', 'doc', 'docx', 'xlsx', 'bmp', 'xls']
      }
    },
    /**
     *  限制格式提示信息
     * 【非必传】
     */
    typeLimitMessage: {
      type: String,
      default: ''
    },
    /**
     * 是否显示文件格式提示说明
     */
    isShowTip: {
      type: Boolean,
      default: false
    },
    /**
     * 是否启用拖拽上传
     * 【非必传】
     */
    isDrag: {
      type: Boolean,
      default: false
    },
    /**
     * 是否重新处理结果
     * 【非必传】
     */
    resultDispose: {
      type: Boolean,
      default: false
    },
    /**
     * 是否禁用
     * 【非必传】
     */
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLoading: this.loading,
      baseUrl: process.env.VUE_APP_BASE_API,
      fileUrl: `${process.env.VUE_APP_BASE_API}/report/excel/import/`,
      headers: getHeader()
    }
  },
  methods: {
    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    handlePreview(file) {
      console.log(file)
    },
    /**
     * 文件上传时的钩子
     */
    handleProgress(event, file, fileList) {
      if (this.isLoading) {
        // showLoading()
        this.isLoading = false
      }
      this.$emit('on-progress', file, fileList)
    },
    /** 文件删除
     * file 被删除文件 fileList 删除后文件列表
     */
    handleRemove(file, fileList) {
      if (file.response) {
        if (file.response.code === '0') {
          let data = file.response.data.fileSign
          this.$emit('on-remove', data, file, fileList)
        }
      } else {
        this.$emit('on-remove', file.fileSign)
      }
    },
    beforeRemove(file) {
      if (file && file.status === 'success') {
        this.$emit('before-remove', file)
      }
    },
    handleExceed(files, fileList) {
      this.$message({ type: 'warning', message: `当前限制选择  ${this.limit} 个文件，共选择了 ${files.length + fileList.length} 个文件` })
    },
    /** 文件上传成功
     * res 上传结果 file 当前上传文件 fileList已上传文件列表
     */
    handleSuccess(res) {
      if (res.code === '0') {
        if (this.resultDispose) {
          this.$emit('on-success', res.data)
        } else if (res && res.data) {
          this.$message({ type: 'warning', message: '导入失败，文件中存在不合规数据，请检查附件 !', duration: 5000 })
        } else {
          this.$emit('on-success')
        }
      } else {
        this.$message({ message: res.msg, type: 'error' })
      }
      // hideLoading();
      this.$refs.upload.clearFiles()
    },
    handleError(err) {
      // hideLoading();
      this.$emit('on-success', err)
    },
    /** 文件上传前
     * 判断文件格式及文件大小
     */
    beforeAvatarUpload(file) {
      // 判断文件类型
      let FileExt = file.name.replace(/.+\./, '')
      const _this = this
      if (_this.typeLimit.indexOf(FileExt.toLowerCase()) === -1) {
        _this.$message({
          type: 'warning',
          message: _this.typeLimitMessage ? _this.typeLimitMessage : `请上传后缀名为${this.typeLimit.join('、')}的附件`
        })
        return false
      }
      // 判断文件大小
      if (file.size === 0) {
        this.$message({
          message: '不能上传0kb文件!',
          type: 'error'
        })
        return false
      }
      if (this.fileFormat) {
        let isKeep = true
        this.$emit('before-upload', file, FileExt, test => {
          isKeep = test
        })
        return isKeep
      } else {
        let isLt2k = file.size / 1024 < 2048 ? '1' : '0'
        if (isLt2k === '0') {
          this.$message({
            message: '上传文件大小不能超过2M!',
            type: 'error'
          })
          return false
        }
        return isLt2k === '1'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-demo {
  margin: 0 10px;
}
</style>
