<template>
    <div>
      <div class="vux-demo-header-box" slot="header">
        <x-header :left-options="{showBack: false}" v-show="true">模拟公众号点击菜单</x-header>
      </div>
      <group title="请选择对应页面">
        <cell title="商城" :link="{path:'/hypermarket/index'}" is-link></cell>
        <cell title="代码原生页面" :link="{path:'/memberHome/activityIndex'}" is-link></cell>
        <cell title="准康农惠公众号主页" :link="{path:'/weChatMain/index'}" is-link></cell>
      </group>
    </div>
</template>

<script>
  import {Cell,Group, XHeader} from 'vux'
    export default {
      components: {
        XHeader,
        Cell,
        Group
      },
      name: "index"
    }
</script>

<style scoped>

</style>
