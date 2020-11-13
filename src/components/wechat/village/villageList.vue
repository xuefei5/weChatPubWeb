<template>
  <div style="background: #000000;margin-top: -1rem;">
    <br/>
    <div style="margin: 15px;overflow: hidden;" v-for="item in villageList">
      <masker style="border-radius: 10px;" :opacity="0.6">
        <div class="m-img" :style="{backgroundImage: 'url(' + imageUrl+item.villageBack + ')'}"></div>
        <div slot="content" class="m-title">
          <h2>{{item.villageName}}</h2>
          <p style="margin-top: 20px">{{item.villageContent}}</p>
          <x-button mini plain class="m-button" v-on:click.native="openVillageDetail(item)"><span style="color: white">查看详情</span></x-button>
        </div>
      </masker>
    </div>
    <divider>已经到底啦</divider>
    <br/>
  </div>
</template>

<script>
import { Masker,XButton,Divider  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL } from "@/store/mutation-types"
export default {
  components: {
    Masker,
    XButton,
    Divider
  },
  name: "villageList",
  data () {
    return {
      imageUrl:IMAGE_URL,
      villageList: []
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
      getAction("phone/api_zknh_wechat_config/queryVillageList").then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.villageList = res.result;
        } else {
          this.$vux.toast.show({
            text: '村集体加载失败',
            type:'warn'
          })
          this.villageList = [];
        }
      })
    },
    openVillageDetail(item){
      console.log("点击详情"+item);
      this.$router.push({path: '/mainRoute/villageDetail', query: item});
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
    padding-bottom: 50%;
    display: block;
    position: relative;
    max-width: 100%;
    height: 5rem;
    background-position: center center;
    cursor: pointer;
    border-radius: 10px;
    background-size: 100% 100% !important;
    background-repeat: no-repeat !important;
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
</style>
