<template>
  <div style="height:100%;">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="keepAlive"/>
        <router-view v-if="!keepAlive" :key="'time'+new Date().getTime()"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "mainRoute",
    computed: {
      keepAlive() {
        return this.$route.meta.keepAlive
      }
    },
    data() {
      return {
        transitionName: ''
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'vux-header-fade-in-right';
        } else {
          this.transitionName = 'vux-header-fade-in-left';
        }
      }

    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .menu-title {
    color: #888;
  }
</style>
