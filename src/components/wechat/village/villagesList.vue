<template>
  <div style="background: #000000;margin-top: -1rem;">
    <br/>
    <div style="margin: 15px;overflow: hidden;" v-for="item in villagesList">
      <masker class="masker" style="border-radius: 10px;" :opacity="0.6">
        <!--:style="{backgroundImage: 'url(' + imageUrl+item.villageBack + ')'}"-->
          <x-img class="m-img" :default-src="imageThuUrl+item.villageBack" :src="imageUrl+item.villageBack" :offset="0"/>
        <div slot="content" class="m-title">
          <h2>{{item.villageName}}</h2>
          <p style="margin-top: 20px">{{item.villageContent}}</p>
          <x-button mini plain class="m-button" v-on:click.native="openVillageDetail(item.id)"><span style="color: white">查看村庄</span></x-button>
        </div>
      </masker>
    </div>
    <divider>已经到底啦</divider>
    <span v-if="this.villagesList.length == 1">
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </span>
    <span v-if="this.villagesList.length == 2">
      <br/><br/><br/><br/>
    </span>
  </div>
</template>

<script>
import { Masker,XButton,Divider,XImg  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
export default {
  components: {
    Masker,
    XButton,
    Divider,
    XImg
  },
  name: "villageList",
  data () {
    return {
      imageUrl:IMAGE_URL,
      imageThuUrl:IMAGE_THU_URL,
      villagesList: []
    }
  },
  mounted(){
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getVillageList();
  },
  methods:{
    getVillageList(){
      let params = {};
      params['villageId'] = '';
      getAction("phone/api_zknh_wechat_config/queryVillageList",params).then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.villagesList = res.result;
        } else {
          this.$vux.toast.show({
            text: '镇列表加载失败',
            type:'warn'
          })
          this.villagesList = [];
        }
      })
    },
    openVillageDetail(id){
      console.log("点击列表"+id);
      this.$router.push({path: '/mainRoute/villageList', query: {"id":id}});
    }
  }


  /*beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#333333')
  },

  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  }*/
}
</script>

<style scoped>
  .m-img {
    display: block;
    position: relative;
    max-width: 100%;
    width: 100%;
    height: 15rem;
    background-position: center center;
    cursor: pointer;
    border-radius: 10px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    height: 5rem;
    top: 20%;
    transform: translateY(-50%);
    padding: 5px 50px 5px 50px;
  }

  .m-button {
    margin-top: 1.5rem;
    font-size: 0.65rem;
    font-weight: bold;
    letter-spacing: 0.025rem;
    color: white;
  }
  .m-button.hover {
    background-color: red;
  }

  @keyframes translateY{
    0%{transform: translateY(50px);opacity: 0;}
    100%{ transform: translateY(0px);opacity: 1;}
  }

  @-webkit-keyframes translateY {/*针对webkit内核*/
    0%{transform: translateY(50px);opacity: 0;}
    100%{ transform: translateY(0px);opacity: 1;}
  }

  .masker{
    animation: translateY;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:translateY 1.5s;/*针对webkit内核*/
  }
</style>
