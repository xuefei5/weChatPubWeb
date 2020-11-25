<template>
  <div v-transfer-dom>
    <x-dialog v-model="isShow" hide-on-blur :dialog-style="{'max-width': '80%', width: '80%', 'background-color': 'transparent'}">
      <flexbox :gutter="0" wrap="wrap" style="background-color:rgba(255,255,255,0.9) ;border-radius: 20px;">
        <flexbox-item :span="1/3" v-for="item in villagesList" :key="item.index">
          <div class="flex-demo" @click="openVillageDetail(item.id)">
            <x-img class="model_icon" :default-src="imageThuUrl+item.villageBack" :src="imageUrl+item.villageBack" :offset="0"/>
            <br/>
            {{item.villageName}}
          </div>
        </flexbox-item>
      </flexbox>
    </x-dialog>
  </div>
</template>

<script>
import { TransferDomDirective as TransferDom,XDialog,Flexbox, FlexboxItem,XImg  } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    Flexbox,
    FlexboxItem,
    XImg
  },
  name: "villageList",
  data () {
    return {
      imageUrl:IMAGE_URL,
      imageThuUrl:IMAGE_THU_URL,
      villagesList: [],
      isShow:false
    }
  },
  mounted(){
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getVillageList();
  },
  methods:{
    show(){
      this.isShow = true;
    },
    getVillageList(){
      const con_this = this;
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
      this.isShow = false;
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
  .model_icon{
    width: 45px;
    height: 45px;
    border-radius: 10px
  }

  .flex-demo {
    font-size: .8rem;
    text-align: center;
    color: black;
    border-radius: 4px;
    background-clip: padding-box;
    margin-top: 1rem;
    animation: fade-in;/*动画名称*/
    animation-duration: 3s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
  }
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
