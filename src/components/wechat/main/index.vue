<template>
    <div class="weChat-main" v-bind:style="{background:'url('+backGroundUrl+')'}">

      <br/><br/><br/><br/>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/3" v-for="mainCon in mainConfigList" :key="mainCon.index">
          <div class="flex-demo" @click="openRouteOrOther(mainCon)">
            <img :src="mainCon.modal_icon"/>
          <br/>
            {{mainCon.modal_name}}
          </div>
        </flexbox-item>
      </flexbox>

    </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { getAction } from '@/api/manage';
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  name: "index",
  data() {
    return {
      backGroundUrl: '',
      mainConfigList:[
        {"modal_name":"村集体","modal_icon":"http://39.104.93.182:8080/images/grid_icon.png","modal_url":"/mainRoute/villageList","modal_type":"1"},
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
    openRouteOrOther(mainCon){

      let modalType = mainCon.modal_type;//1-内部链接，2-外部链接
      switch (modalType) {
        case "1":
          this.$router.push(mainCon.modal_url);
          break;
        case "2":
          window.open(mainCon.modal_url,"_self");
          break
        default:
          this.$vux.toast.show({
            text: '非法选项',
            type:'warn'
          })
          break;
      }
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
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
  }
</style>
