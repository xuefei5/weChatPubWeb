<template>
  <div class="weChat-main" v-bind:style="{background:'url('+backGroundUrl+')'}">
    <div class="drag">
      <br/><br/>
      <div class="title">
        准康云线上平台<icon type="ios-cart-outline"></icon>
      </div>
      <br/><br/>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/3" v-for="mainCon in mainConfigList" :key="mainCon.index">
          <div class="flex-demo" @click="openRouteOrOther(mainCon)">
            <span v-if="mainCon.iconType == '2'">
              <icon :type="mainCon.modalIcon" is-msg></icon>
            </span>
            <span v-if="mainCon.iconType == '1'">
              <img class="model_icon" :src="imageUrl+mainCon.modalIcon"/>
            </span>
            <br/>
            {{mainCon.modalName}}
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Icon  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL } from "@/store/mutation-types"
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Icon
  },
  name: "index",
  data() {
    return {
      imageUrl:IMAGE_URL,
      backGroundUrl: '',
      mainConfigList:[
      ]
    }
  },
  mounted() {
    this.getMainBackGround();
    this.getMainModel();
  },
  methods: {
    getMainBackGround() {
      getAction("phone/api_zknh_wechat_config/getWeChatMainBack").then(res => {
        let code = res.code;
        console.log("服务端返回的背景图链接为" + res.result)
        if ("200" == code) {
          this.backGroundUrl = IMAGE_URL+res.result;
        } else {
          this.$vux.toast.show({
            text: '背景图加载失败',
            type:'warn'
          })
          this.backGroundUrl = '';
        }
      })
    },
    getMainModel(){
      getAction("phone/api_zknh_wechat_config/getWeChatMainModel").then(res => {
        let code = res.code;
        console.log("服务端返回的模块为" + res.result)
        if ("200" == code) {
          this.mainConfigList = res.result;
        } else {
          this.$vux.toast.show({
            text: '模块加载失败',
            type:'warn'
          })
          this.mainConfigList = [];
        }
      })
    },
    openRouteOrOther(mainCon){

      let modalType = mainCon.modalType;//1-内部链接，2-外部链接
      switch (modalType) {
        case 1:
          this.$router.push(mainCon.modalUrl);
          break;
        case 2:
          window.open(mainCon.modalUrl,"_self");
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
    position: relative;
    z-index:1;
  }
  .weChat-main:after{
    content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    margin-top: 1rem;
  }
  .title{
    font-size: 2rem;
    color: white;
    text-align: center;
    font-family:Cursive;
    font-weight:bold;
  }

  .drag{
    position: relative;
    z-index:3;
  }

  .model_icon{
    width: 54px;
    height: 54px;
    border-radius: 10px
  }
</style>
