<template>
  <div style="background: #000000;margin-top: -1rem;">
    <br/>
    <div style="margin: 15px;overflow: hidden;" v-for="item in villageList">
      <masker style="border-radius: 10px;" :opacity="0.6">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
        <div slot="content" class="m-title">
          <h2>{{item.title}}</h2>
          <p style="margin-top: 20px">{{item.content}}</p>
          <x-button mini plain class="m-button" v-on:click.native="openVillageDetail(item.id)"><span style="color: white">查看详情</span></x-button>
        </div>
      </masker>
    </div>
    <divider>已经到底啦</divider>
    <br/>
  </div>
</template>

<script>
import { Masker,XButton,Divider  } from 'vux'
export default {
  components: {
    Masker,
    XButton,
    Divider
  },
  name: "villageList",
  data () {
    return {
      villageList: [{
        id:"1",
        title: '敖靠塔村',
        content:'敖靠塔村位于准格尔旗经济开发区的北进出口处。',
        img: 'http://39.104.93.182/images/village_model_1.png'
      }, {
        id:"2",
        title: '不拉村',
        content:'位于沙圪堵镇政府所在地，东与安定壕村接壤，南与福路村毗邻，西与忽昌梁村连接，北与敖靠塔村相邻，交通便利。',
        img: 'http://39.104.93.182/images/village_model_2.png'
      }, {
        id:"3",
        title: '布尔洞沟村',
        content:'位于沙圪堵镇西南部，东邻石窑沟村，南至四道包村，北与神山村、西营子村、忽昌梁村连接，西与张圪堵村接壤。',
        img: 'http://39.104.93.182/images/village_model_3.png'
      }]
    }
  },
  methods:{
    openVillageDetail(id){
      console.log("点击详情"+id);
      this.$router.push({path: '/mainRoute/villageDetail', query: {villageId: id}});
    }
  },

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
