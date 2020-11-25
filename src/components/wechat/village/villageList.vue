<template>
  <div>
  <div class="title">
    <img src="../../../assets/images/zknh/cun_logo.png" class="logo"/>村集体列表
  </div>
  <div class="panel" >
    <panel :list="list" :type="type" @on-img-error="onImgError"></panel>
  </div>
    <divider>已经到底啦</divider>
  </div>
</template>

<script>
import { Panel, Group, Divider } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL,IMAGE_THU_URL } from "@/store/mutation-types"
export default {
  components: {
    Divider,
    Panel,
    Group

  },
  name: "villageList",
  mounted(){
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getVillageList();
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    getVillageList(){
      let params = {};
      let con_this = this;
      params['villageId'] = this.id;
      getAction("phone/api_zknh_wechat_config/queryVillageList",params).then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.villageList = res.result;
          let list = res.result;
          list.forEach(function (item,index){
            let myItem = {};
            myItem.src = IMAGE_URL +item.villageBack;
            myItem.title = item.villageName;
            myItem.desc = item.villageContent;
            myItem.url = '/mainRoute/villageDetail?id='+item.id +'&villageName='+item.villageName+'&villageMainImg='+item.villageMainImg;
            con_this.list.push(myItem);
            }

          )
          if(this.villageList.length == 0){
            this.$vux.toast.text('没有配置村列表','top');
            window.history.go(-1);
          }
        } else {
          this.$vux.toast.show({
            text: '村集体加载失败',
            type:'warn'
          })
          this.villageList = [];
        }
      })
    }

  },
  data () {
    return {
      imageUrl:IMAGE_URL,
      imageThuUrl:IMAGE_THU_URL,
      villageList: [],
      id:this.$route.query.id,
      type: '1',
      list: [],
      /*footer: {
        url: 'http://vux.li'
      }*/
    }
  }
}
</script>
<style scoped>
.title{
  font-size: 2rem;
  color: #211d1d;
  text-align: center;
  font-family:Cursive;
  font-weight:bold;
  animation: fade-in;/*动画名称*/
  animation-duration: 2s;/*动画持续时间*/
  -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
}
.panel{
  animation: fade-in;/*动画名称*/
  animation-duration: 2s;/*动画持续时间*/
  -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
}
.logo{
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
