<template>
  <div
    ref="page"
    :class="{ 'floating-window': true, zIndexTop: moveFlags }"
    @mouseup.stop.prevent="moveEnd"
  >
    <div
      class="popover-content__trigger floatBtn"
      ref="floatBtn"
      :style="{
        transition: !moveFlags ? 'all 300ms ease' : 'unset',
        transform: `translate3d(${transform.left}px,${transform.top}px,0)`,
      }"
      @mousedown.stop.prevent="moveStart"
      @mouseover.stop.prevent="showButton"
      @click.stop.prevent="togglefloatbtn"
    >
      <span
        @mouseleave.stop.prevent="hideButton"
        :style="{
          left: transform.left < 50 ? '-50px' : 0,
          width: moveFlags ? '50px' : '100px',
        }"
        class="hover-area"
      ></span>
      <transition name="floating-popover-fade-in-out">
        <div
          ref="popoverContent"
          class="floating-popover"
          :style="menuPosition"
          v-if="popoverShow"
        >
          <slot>
            <!-- 暂时不用 
              <div class="popover-content">
              <div
                class="popover-content__item to-button"
                @click.stop.prevent="
                  handleClickMenuAction();
                  closeMenuAndFloating();
                "
              >
                <i class="iconfont_1 icon-shezhi float-icon-clazz"></i>Z
              </div>
            </div> -->
          </slot>
        </div>
      </transition>
      <i
        :style="{ fontSize: `${form.fontSize}px` }"
        class="iconfont_1 icon-shezhi float-icon-clazz"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { EventBus } from '@/utils/event-bus';
import { LayoutconfModule } from '@/store/modules/layoutconf'

@Component({
  name: 'YxtFloatButton'
})
export default class YxtFloatButton extends Vue {
  [x: string]: any
  @Ref('popoverContent') readonly popoverContentRef: any
  @Ref('floatBtn') readonly floatBtnRef: any
  @Prop({ default: {} }) public form!: any
  public moveFlags: boolean = false
  public clickFlag: boolean = false
  public hoverFlag: boolean = false
  // 初始的位置记录
  public movePosition: any = { x: 0, y: 0 }
  public nx: any = ""
  public ny: any = ""
  public dx: any = ""
  public dy: any = ""
  public xPum: any = ""
  public yPum: any = ""
  public popoverShow: boolean = false
  //浮窗的位置
  public transform: any = {
    top: document.body.offsetHeight - 300,
    left: document.body.offsetWidth - 25,
  }
  public lastMoveIndex: number = 0 //  拖拽计数
  public curMoveIndex: number = 0 //  历史计数
  public menuPosition: any = {
    top: 0,
    left: 0,
  }

  created() {
    document.addEventListener("mouseup", (e) => {
      if (
        e.clientY > window.innerHeight ||
        e.clientY < 60 ||
        e.clientX < 0 ||
        e.clientX > window.innerWidth
      ) {
        this.moveEnd();
      }
    });
  }

  mounted() {
    window.addEventListener("resize", () => {
      this.$set(this.transform, "top", document.body.offsetHeight - 300);
      this.$set(this.transform, "left", document.body.offsetWidth - 25);
    });
    document.addEventListener("click", (event) => {
      if (!this.floatBtnRef) return;
      var tDom = event.target;
      if (this.floatBtnRef !== tDom && !this.floatBtnRef.contains(tDom)) {
        this.closeMenuAndFloating();
      }
    });
  }

    // handleClickMenuAction() {
    //   this.$alert("点击菜单了", "标题名称", {
    //     confirmButtonText: "确定",
    //   });
    //   return;
    // },
    closeMenuAndFloating() {
      this.popoverShow = false;
      this.hoverFlag = false;
      this.moveFlags = false;
      this.resetFloatBtnLocation();
    }
    async togglefloatbtn() {
      //  如果上一次down事件到下一次click事件中 相同即为点击事件
      if (this.lastMoveIndex == this.curMoveIndex) {
        this.popoverShow = !this.popoverShow;
        await this.$nextTick();
        if (this.popoverShow) {
          document.onmousemove = null;
          const { top, left } = this.transform;
          if (top >= 60) {
            this.menuPosition.top = `-${
              this.popoverContentRef.offsetHeight + 10
            }px`;
          } else {
            this.menuPosition.top = "60px";
          }
          if (left > 200) {
            this.menuPosition.left = "-132px";
          } else {
            this.menuPosition.left = 0;
          }
        }
        EventBus.$emit('togglefloatbtn', '打开主题配置侧边栏')
      }
      this.curMoveIndex = this.lastMoveIndex;
    }
    hideButton() {
      if (this.popoverShow) return;
      this.hoverFlag = false;
      //移动过程中不复位 按钮；
      if (this.moveFlags) return;
      this.resetFloatBtnLocation();
    }
    showButton() {
      if (this.moveFlags) return (this.hoverFlag = false);
      this.hoverFlag = true;
      const { left, top } = this.transform;
      if (left > 0 && left < -25) return;
      let bodyWidth = document.body.clientWidth;
      if (left < bodyWidth / 2) {
        this.generateTransform({ top: top, left: 20 });
      } else {
        this.generateTransform({ top: top, left: bodyWidth - 70 });
      }
    }
    moveStart(e) {
      if (e.button == 2) return;
      if (this.popoverShow) {
        this.moveFlags = false;
        return;
      }
      this.clickFlag = true;
      this.movePosition.x = e.clientX;
      this.movePosition.y = e.clientY;
      //计算鼠标相对元素的位置
      const { left, top } = this.transform;
      this.dx = e.clientX - left;
      this.dy = e.clientY - top;
      this.moveFlags = true;
      document.onmousemove = async (e) => {
        this.clickFlag = false;
        this.moveFlags = true;
        let bodyWidth = document.body.clientWidth;
        let bodyHeight = document.body.clientHeight;
        let moveMaxHeight = bodyHeight - 30;
        let moveMaxWidth = bodyWidth - this.floatBtnRef.offsetWidth / 2 + this.dx;
        this.nx = e.clientX;
        this.ny = e.clientY;
        this.xPum = (this.nx > moveMaxWidth ? moveMaxWidth : this.nx) - this.dx;
        this.yPum =
          (this.ny > moveMaxHeight ? moveMaxHeight : this.ny) - this.dy;
        await this.$nextTick();
        this.lastMoveIndex++;
        this.generateTransform({
          left: this.xPum > -25 ? this.xPum : -25,
          top: this.yPum > 0 ? this.yPum : 0,
        });
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.moveEnd();
      };
    }
    generateTransform({ top, left }) {
      if (!this.floatBtnRef) return;
      this.$set(this.transform, "left", left);
      this.$set(this.transform, "top", top);
    }
    resetFloatBtnLocation() {
      if (!this.floatBtnRef) return;
      let bodyWidth = document.body.clientWidth;
      const { left, top } = this.transform;
      if (left < bodyWidth / 2) {
        this.generateTransform({ top, left: `-25` });
      } else {
        this.generateTransform({ top, left: bodyWidth - 25 });
      }
    }
    moveEnd() {
      this.moveFlags = false;
      if (this.hoverFlag) return;
      document.onmousemove = null;
      this.resetFloatBtnLocation();
    }
}
</script>
<style lang="scss" scoped>
.zIndexTop {
  z-index: 1000;
}
.floating-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  .floatBtn {
    position: absolute;
    z-index: 1000;
    cursor: pointer;
    .icon {
      color: $yxt-color-text-1;
      font-size: 24px;
      -webkit-user-drag: none;
    }
    ::v-deep .hover-area {
      position: absolute;
      width: 100px;
      height: 100%;
    }
    span:last-child {
      z-index: 2;
    }
  }
  .popover-content {
    width: 100% !important;
    &__trigger {
      width: 50px;
      height: 50px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 40px;
      box-shadow: 0px 16px 34px 0px rgba(0, 49, 128, 0.2);
      pointer-events: auto;
    }
  }
}
</style>
<style lang="scss" scoped>
.floating-popover-fade-in-out {
  &-enter-active,
  &-leave-active {
    transition-timing-function: ease;
    transition-duration: 300ms;
    transition-property: opacity, transform;
  }
  &-enter,
  &-leave-to {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
}
.floating-popover {
  position: absolute;
  padding: 0 !important;
  border: 0 !important;
}
</style>