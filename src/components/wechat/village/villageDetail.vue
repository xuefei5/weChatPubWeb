<template>
    <div class="main-div">
      <x-img :default-src="imageThuUrl+villageInfo.villageMainImg" :src="imageUrl+villageInfo.villageMainImg" :offset="-10000000" class="village-main-img"/>
      <br/>
      <div class="title_me">{{villageInfo.villageName}}</div>
      <!--<load-more :show-loading="false"></load-more>-->
      <flexbox orient="vertical">
        <flexbox-item v-for="item in detailList" :key="item.index">
          <load-more :show-loading="false"></load-more>
          <div class="detail-div">
            <h2 style="text-align: center">{{item.modelName}}</h2>
            <br/>
            <x-img :default-src="imageThuUrl+item.modelImg" :src="imageUrl+item.modelImg" :offset="0" class="detail_img"/>
            <br/>
            <div class="detail-text">&nbsp;&nbsp;&nbsp;&nbsp; {{item.modelContent}}</div>
          </div>
        </flexbox-item>
      </flexbox>
      <divider>已经到底啦</divider>
      <br/>
    </div>
</template>

<script>
import { Divider,Flexbox, FlexboxItem,LoadMore,XImg  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
export default {
  components: {
    Divider,
    Flexbox,
    FlexboxItem,
    LoadMore,
    XImg
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
    background-color: #999999;
  }
  .village-main-img{
    border-radius: 20px;
    height: 14rem;
    width: 22rem;
    margin: 10px 10px 10px 10px;
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }
  .detail-div{
    text-align: center;
    border-radius: 20px;
    background-color: white;
    margin: 10px 10px 10px 10px;
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
    border-radius: 20px;
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
