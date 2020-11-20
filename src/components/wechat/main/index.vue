<template>
  <div class="weChat-main" v-bind:style="{background:'url('+backGroundUrl+')'}">
    <div class="drag">
      <x-img class="main_lefttop" :default-src="imageThuUrl+leftImgUrl" :src="imageUrl+leftImgUrl" :offset="0"/>
      <br/>
      <div class="title">
        准康云线上平台<img src="../../../assets/images/zknh/zknh_logo.png" class="logo"/>
      </div>
      <br/><br/>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/3" v-for="mainCon in mainConfigList" :key="mainCon.index">
          <div class="flex-demo" @click="openRouteOrOther(mainCon)">
            <span v-if="mainCon.iconType == '2'">
              <icon :type="mainCon.modalIcon" is-msg></icon>
            </span>
            <span v-if="mainCon.iconType == '1'">
              <x-img class="model_icon" :default-src="imageThuUrl+mainCon.modalIcon" :src="imageUrl+mainCon.modalIcon" :offset="0"/>
            </span>
            <br/>
            {{mainCon.modalName}}
          </div>
        </flexbox-item>
      </flexbox>
    </div>

    <!--引入镇选择组件-->
    <villages-list ref="villagesList"></villages-list>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Icon,Spinner,,XImg   } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
import VillagesList from "../village/villagesList";
export default {
  components: {
    VillagesList,
    Flexbox,
    FlexboxItem,
    Icon,
    Spinner,
    XImg
  },
  name: "index",
  data() {
    return {
      model_an:false,
      transitionName:'vux-header-fade-in-left',
      imageUrl:IMAGE_URL,
      imageThuUrl:IMAGE_THU_URL,
      backGroundUrl: '',
      leftImgUrl:'',
      mainConfigList:[
      ]
    }
  },
  mounted() {
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getMainBackGround();
    this.getMainLeftTop();
    this.getMainModel();
  },
  methods: {
    getMainBackGround() {
      getAction("phone/api_zknh_wechat_config/getWeChatMainBack").then(res => {
        let code = res.code;
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
    getMainLeftTop() {
      getAction("phone/api_zknh_wechat_config/getWeChatMainLeftImg").then(res => {
        let code = res.code;
        if ("200" == code) {
          this.leftImgUrl = res.result;
        } else {
          this.leftImgUrl = '';
        }
      })
    },
    getMainModel(){
      getAction("phone/api_zknh_wechat_config/getWeChatMainModel").then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.mainConfigList = res.result;
          this.model_an = true;
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
      //如果没有配置url,说明该模块没有实现
      if(!mainCon.modalUrl){
        this.$vux.toast.text('么着急，敬请期待^_^','top');
        return;
      }

      let modalType = mainCon.modalType;//1-内部链接，2-外部链接
      switch (modalType) {
        case 1:
          this.openRoute(mainCon.modalUrl);
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
    },
    openRoute(url){
      //先写死，后面需要判断
      this.$refs.villagesList.show();
      //this.$router.push(url);
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
    animation: fade-in;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
  }
  .flex-demo.hover {
    background-color: #999999;
  }
  .title{
    font-size: 2rem;
    color: white;
    text-align: center;
    font-family:Cursive;
    font-weight:bold;
    animation: fade-in;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
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

  .logo{
    width: 20px;
    height: 20px;
    margin-bottom: .5rem;
  }

  .main_lefttop{
    width: 54px;
    height: 54px;
    border-radius: 10px;
    margin-top: .5rem;
    margin-left: .5rem;
  }

  @keyframes fade-in {
    0%{transform: scale(0.2);opacity: 0;}
    100%{ transform: scale(1);opacity: 1;}
  }
  @-webkit-keyframes fade-in {/*针对webkit内核*/
    0%{transform: scale(0.2);opacity: 0;}
    100%{ transform: scale(1);opacity: 1;}
  }

</style>
