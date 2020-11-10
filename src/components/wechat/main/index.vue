<template>
    <div class="weChat-main" v-bind:style="{background:'url('+backGroundUrl+')'}">

      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :label="mainCon.modal_name" v-for="mainCon in mainConfigList" :key="mainCon.index">
          <img slot="icon" :src="mainCon.modal_icon">
          <span @click="this.openRouteOrOther(mainCon.index)">
            </span>
        </grid-item>
      </grid>

    </div>
</template>

<script>
import { Grid, GridItem } from 'vux'
import { getAction } from '@/api/manage';
export default {
  components: {
    Grid,
    GridItem
  },
  name: "index",
  data() {
    return {
      backGroundUrl: '',
      mainConfigList:[
        {"modal_name":"村集体","modal_icon":"http://39.104.93.182:8080/images/grid_icon.png","modal_url":"/weChat/villageList","modal_type":"1"},
        {"modal_name":"准康商城","modal_icon":"http://39.104.93.182:8080/images/grid_icon.png","modal_url":"http://zknhshop.jobzhiliren.com/wap/index.html","modal_type":"2"},
        {"modal_name":"准格尔720云","modal_icon":"http://39.104.93.182:8080/images/grid_icon.png","modal_url":"http://zknhshop.jobzhiliren.com/wap/index.html","modal_type":"2"}
      ]
    }
  },
  mounted() {
    this.getMainBackGround();
  },
  methods: {
    getMainBackGround() {
      getAction("phone/api_zknh_wechat_config/getWeChatMainBack").then(res => {
        let code = res.code;
        console.log("服务端返回的背景图链接为" + res.result)
        if ("200" == code) {
          this.backGroundUrl = res.result;
        } else {
          this.$vux.toast.show({
            text: '背景图加载失败',
            type:'warn'
          })
          this.backGroundUrl = '';
        }
      })
    },
    openRouteOrOther(index){

      this.$vux.toast.show({
        text: '点击了'
      })
    }
  }
}
</script>

<style scoped>

  .weChat-main{
    height: 100%;
    width: 100%;
    background-repeat: no-repeat !important;
    background-size: 100% 100% !important;
  }
</style>
