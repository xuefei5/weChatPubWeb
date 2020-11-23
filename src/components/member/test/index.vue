<template>
  <div>
    <divider>王顺智障</divider>
    <card :header="{title:'王顺智障'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          京豆
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          京东券
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          京东卡/E卡
        </div>
        <div>
          <span>88</span>
          <br/>
          七天待还
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import { Divider, Card } from 'vux'
  import { getAction } from '@/api/manage';
    export default {
      name: "index",
      components: {
        Card,
        Divider
      },
      data(){
        return{
        }
      },
      //初始化执行的方法
      mounted() {
        /*let param = {"offerType":"1"};
        getAction("phone/offer/list", param).then(res => {
          this.serverData = res.result
        })*/
      }
    }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
</style>
