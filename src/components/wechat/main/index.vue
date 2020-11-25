<template>
  <div style="height: 100%;">
  <div class="sky">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
    <div class="drag">
      <div style="background-color: rgba(255,255,255,0.5)">
        <x-img class="main_top" :default-src="imageThuUrl+backGroundUrl" :src="imageUrl+backGroundUrl" :offset="0"/>
        <br/><br/><br/>
        <div class="title">
          <img src="../../../assets/images/zknh/zknh_logo.png" class="logo"/>
          <br/>
          <span style="font-size: .9rem;color:black">准康农汇助农平台</span>
        </div>
        <br/>
      </div>
      <div style="height: .5rem;"></div>
      <flexbox :gutter="0" wrap="wrap" style="background-color: rgba(255,255,255,0.5);">
        <flexbox-item :span="1/5" v-for="mainCon in mainConfigList" :key="mainCon.index">
          <div class="flex-demo" @click="openRouteOrOther(mainCon)">
            <span v-if="mainCon.iconType == '2'">
              <icon :type="mainCon.modalIcon" is-msg></icon>
            </span>
            <span v-if="mainCon.iconType == '1'">
              <x-img class="model_icon" :default-src="imageThuUrl+mainCon.modalIcon" :src="imageUrl+mainCon.modalIcon" :offset="0"/>
            </span>
            <br/>
            <span style="font-size: .8rem;color:black">{{mainCon.modalName}}</span>

          </div>
        </flexbox-item>
      </flexbox>
      <div style="height: .5rem;"></div>
      <div style="background-color: rgba(255,255,255,0.5);">
        <panel style="background-color: transparent" :header="zkIssueHeader" :list="zkIssueList" type="5" :footer="footer"></panel>
      </div>
    </div>
  </div>
    <!--引入镇选择组件-->
    <villages-list ref="villagesList"></villages-list>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem,Icon,Spinner,XImg,Panel   } from 'vux'
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
    XImg,
    Panel
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
      ],
      zkIssueHeader:'<span style="color: white">准康发布</span>',
      zkIssueList:[
        {
          src: 'http://39.104.93.182/images/caomei.jpg',
          desc: '<span style="color: white;font-size: .9rem;">好久“莓”见:冬天里的“第一盒草莓”新鲜上市啦!!!</span>',
          url: '',
          meta: {
            source: '2020-11-24',
            other: '准康农汇'
          }
        }
      ],
      footer: {
        title: '更多',
        url: ''
      }
    }
  },
  mounted() {
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getMainBackGround();
    this.getMainModel();
  },
  methods: {
    getMainBackGround() {
      getAction("phone/api_zknh_wechat_config/getWeChatMainBack").then(res => {
        let code = res.code;
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
    background: #ececec;
    filter: blur(2px);
    z-index: 2;
  }
  .flex-demo {
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background-clip: padding-box;
    margin-top: 1rem;
    margin-bottom: 1rem;
    animation: fade-in;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
  }
  .flex-demo.hover {
    background-color: #999999;
  }
  .title{
    color:black;
    text-align: center;
    margin-top: -5rem;
    animation: fade-in;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
  }

  .drag{
    position: relative;
    z-index:3;
  }

  .model_icon{
     width: 45px;
     height: 45px;
     border-radius: 10px
   }

  .logo{
    width: 3rem;
    height: 3rem;
  }

  .main_top{
    width: 100%;
    height: 7rem;
    border-radius: 0 0 45% 45%;
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
