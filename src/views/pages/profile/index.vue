<template>
  <div class="profile">
    <to-row :gutters="24">
      <to-col :span="24">
        <to-button type="primary">to-button主要按钮</to-button>
        <to-button type="success">成功按钮</to-button>
        <to-button type="info">信息按钮</to-button>
        <to-button type="warning">警告按钮</to-button>
        <to-button type="danger">危险按钮</to-button>
        <to-divider></to-divider>
      </to-col>
      <to-col :span="24">
        <!-- <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button> -->
      </to-col>
    </to-row>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class extends Vue {
  public userName = '报表测试用户'
}
</script>

<style lang="scss" scoped>
.profile {
  height: calc(100vh - 96px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
