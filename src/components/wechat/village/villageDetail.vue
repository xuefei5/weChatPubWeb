<template>
    <div class="main-div">
      <x-header style="background-color:#000000;" :left-options="{backText: '主页'}">村集体列表</x-header>
      <x-img :default-src="imageThuUrl+villageInfo.villageMainImg" :src="imageUrl+villageInfo.villageMainImg" :offset="-10" class="village-main-img"/>
      <br/>
      <div class="title_me">{{villageInfo.villageName}}</div>
      <!--<load-more :show-loading="false"></load-more>-->
      <flexbox orient="vertical">
        <flexbox-item v-for="item in detailList" :key="item.index">
          <load-more :show-loading="false"></load-more>
          <div class="detail-div-top"></div>
          <div class="detail-div">
            <h2 style="text-align: center">{{item.modelName}}</h2>
            <br/>
            <x-img :default-src="imageThuUrl+item.modelImg" :src="imageUrl+item.modelImg" :offset="0" class="detail_img"/>
            <br/>
            <div class="detail-text">&nbsp;&nbsp;&nbsp;&nbsp; {{item.modelContent}}</div>
          </div>
          <div class="detail-div-bottom"></div>
        </flexbox-item>
      </flexbox>
      <divider>已经到底啦</divider>
      <br/>
    </div>
</template>

<script>
import { Divider,Flexbox, FlexboxItem,LoadMore,XImg,XHeader  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
export default {
  components: {
    Divider,
    Flexbox,
    FlexboxItem,
    LoadMore,
    XImg,
    XHeader
  },
  name: "villageDetail",
  data() {
    return {
      imageUrl:IMAGE_URL,
      imageThuUrl:IMAGE_THU_URL,
      villageInfo: this.$route.query,
      detailList:[]
    }
  },
  mounted() {
    this.$vux.loading.show({
      text: '查询详情...'
    });
    this.getVillageDeail();
  },
  methods:{
    getVillageDeail(){
      let params = {};
      params['villageId'] = this.villageInfo.id;
      getAction("phone/api_zknh_wechat_config/getVillageDeail",params).then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.detailList = res.result;
          if(this.detailList.length == 0){
            this.$vux.toast.text('没有配置详情','top');
            window.history.go(-1);
          }
        } else {
          this.$vux.toast.show({
            text: '村集体详情加载失败',
            type:'warn'
          });
          this.detailList = [];
          window.history.go(-1);
        }
      })
    },
  }
}
</script>

<style scoped>

  .main-div{
    text-align: center;
    background-color: white;
  }
  .village-main-img{
    border-radius: 10px;
    height: 14rem;
    width: 22rem;
    margin: 10px 10px 10px 10px;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }
  .detail-div{
    text-align: center;
    border-radius: 10px;
    background-image: url("http://39.104.93.182/images/main_backgroud/villageDetail_brod_center.png");
    margin: 10px 10px 10px 10px;
    background-repeat: no-repeat !important;
    padding-top: 10px;
    padding-bottom: 10px;
    background-size: 100% 100% !important;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }

  .detail-div-top{
    text-align: center;
    background-image: url("http://39.104.93.182/images/main_backgroud/villageDetail_brod_top.png");
    margin: 10px 10px -1rem 10px;
    background-repeat: no-repeat !important;
    padding-top: 10px;
    background-size: 100% 100% !important;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }

  .detail-div-bottom{
    text-align: center;
    background-image: url("http://39.104.93.182/images/main_backgroud/villageDetail_brod_bottom.png");
    margin: -1rem 10px 10px 10px;
    background-repeat: no-repeat !important;
    padding-top: 10px;
    background-size: 100% 100% !important;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }

  .title_me{
    font-size: 2rem;
    color: black;
    text-align: center;
    font-family:Cursive;
    font-weight:bold;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }
  .detail-text{
    text-align: left;
    margin: 10px 10px 10px 10px;
  }
  .detail_img{
    border-radius: 10px;
    height: 13rem;
    width: 21rem;
    margin: 10px 10px 10px 10px;
  }

  @keyframes translateY{
    0%{transform: translateY(50px);opacity: 0;}
    100%{ transform: translateY(0px);opacity: 1;}
  }

  @-webkit-keyframes translateY {/*针对webkit内核*/
    0%{transform: translateY(50px);opacity: 0;}
    100%{ transform: translateY(0px);opacity: 1;}
  }

</style>
