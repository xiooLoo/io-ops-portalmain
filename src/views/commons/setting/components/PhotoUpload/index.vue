<!--
 *  功能：  图片上传及展示
 *  入参：
        photoLimit:     [非必传]文件上传限制个数
        photoList:      [非必传]默认已上传文件列表
 *  用法：
        import PhotoUpload from '@/components/PhotoUpload'
        ...
        <template>
              <PhotoUpload :photo-list="fileList" @on-remove="handleRemove" @on-success="handleSuccess" />
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
      class="upload-demo"
      :action="fileUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-change="handleLimit"
      :file-list="photoList"
      list-type="picture-card"
      :limit="photoLimit"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
      :class="{disabled:uploadDisabled}"
    >
      <i class="to-icon-plus" />
      <div slot="tip" class="to-upload__tip">{{ uploadTip }}</div>
    </to-upload>
    <to-dialog :visible.sync="dialogVisible" width="30%" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </to-dialog>
  </div>
</template>
<script>
import { getHeader } from '@/utils/cookies'
export default {
  name: 'PhotoUpload',
  props: {
    /**
     * 文件上传限制个数
     * 【非必传】
     */
    photoLimit: {
      type: Number,
      default: 1
    },
    /**
     * 文件上传说明
     * 【非必传】
     */
    uploadTip: {
      type: String,
      default: '可以上传jpg、jpeg、png、gif或bmp文件，且不超过2M'
    },
    /**
     *  默认文件列表
     * 【非必传】
     */
    photoList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: getHeader(),
      dialogVisible: false,
      dialogImageUrl: '',
      baseURL: process.env.VUE_APP_BASE_URL,
      fileUrl: `${process.env.VUE_APP_BASE_URL}/oss/upload/official`,
      uploadDisabled: false
    }
  },
  watch: {
    photoList: function(newVal) { // 由于编辑时设置上传加号隐藏
      if (newVal.length >= this.photoLimit) {
        this.uploadDisabled = true
      }
    }
  },
  mounted() {
  },
  methods: {
    // 点击已上传文件执行
    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    /** 文件删除方法
     * file 被删除文件 fileList 删除后文件列表
     */
    handleRemove(file, fileList) {
      this.uploadDisabled = false
      if (file.response) {
        if (file.response.data.code === '0') {
          let data = file.response.data.fileSign
          this.$emit('on-remove', data, file, fileList)
        }
      } else {
        this.$emit('on-remove', file.fileSign)
      }
    },
    handleExceed(files, fileList) {
      this.$message({ type: 'warning', message: `当前限制选择  ${this.photoLimit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件` })
    },
    /** 文件上传成功方法
     * res 上传结果 file 当前上传文件 fileList已上传文件列表
     */
    handleSuccess(res, file, fileList) {
      if (res.code === '0') {
        this.$emit('on-success', res.data.fileSign, res, file, fileList)
      }
    },
    /** 文件上传前
     * 判断文件格式及文件大小
     */
    beforeAvatarUpload(file) {
      // 判断文件类型
      let FileExt = file.name.replace(/.+\./, '')
      if (['jpg', 'jpeg', 'png', 'bmp', 'gif'].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message({
          type: 'warning',
          message: '请上传后缀名为jpg、jpeg、png、gif或bmp的图片文件！'
        })
        return false
      }
      // 判断文件大小
      let isLt2k = file.size / 1024 < 2048 ? '1' : '0'
      if (isLt2k === '0') {
        this.$message({
          message: '上传文件大小不能超过2M!',
          type: 'error'
        })
        return false
      } else if (file.size === 0) {
        this.$message({
          message: '不能上传0kb文件!',
          type: 'error'
        })
        return false
      }
    },
    handleLimit(file, fileList) {
      if (file.status == 'success') {
        if (fileList.length >= this.photoLimit) {
          this.uploadDisabled = true
        } else {
          this.uploadDisabled = false
        }
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.disabled ::v-deep .to-upload--picture-card {
    display: none!important;
}
</style>
