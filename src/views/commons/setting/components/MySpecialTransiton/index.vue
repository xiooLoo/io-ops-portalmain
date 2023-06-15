<template>
  <transition :name="activeName">
    <slot />
  </transition>
</template>

<script>
/**
 * Transiton 动画组件
 * 不同动画只需根据class对应修改样式即可。
 * @author leizhe
 */
export default {
  name: 'MySpecialTransiton',
  props: {
    value: {
      type: Boolean,
      default: true
    },
    activeName: {
      type: String,
      default: 'fadeyc'
    }
  }
}
</script>

<style scoped lang="scss">
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(.3,.57,.76,.5);
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
}
</style>
