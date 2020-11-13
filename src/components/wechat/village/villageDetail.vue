<template>
    <div class="main-div">
      <img :src="imageUrl+villageInfo.villageMainImg" class="village-main-img"/>
      <br/>
      <span class="title">{{villageInfo.villageName}}</span>
      <!--<load-more :show-loading="false"></load-more>-->
      <flexbox orient="vertical">
        <flexbox-item v-for="item in detailList" :key="item.index">
          <load-more :show-loading="false"></load-more>
          <div class="detail-div">
            <h2 style="text-align: center">{{item.modelName}}</h2>
            <br/>
            <img :src="imageUrl+item.modelImg" class="detail_img"/>
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
import { Divider,Flexbox, FlexboxItem,LoadMore } from 'vux'
import { getAction } from '@/api/manage';
import { IMAGE_URL } from "@/store/mutation-types"
export default {
  components: {
    Divider,
    Flexbox,
    FlexboxItem,
    LoadMore
  },
  name: "villageDetail",
  data() {
    return {
      imageUrl:IMAGE_URL,
      villageInfo: this.$route.query,
      detailList:[
        {"modelName":"村情概况","modelImg":"village_detail_mode_3.png","modelContent":"敖靠塔村位于准格尔旗经济开发区的北进出口处，纳榆线横贯全村，以纳林河为轴对称分布，川东5个社，川西5个社，总占地面积73平方公里，耕地总面积5730亩，其中水浇地551.7亩，实施退耕还林工程6254.3亩，荒山造林6655亩，牲畜总头数5437头（只），全村总户数941户,总人口2126人(其中少数民族101户、196人），常住人口524户、1177人，村党支部现有党员49名，村干部5名，村务监督委员会3名，大学生村官1名。全村沿川6社土地平缓，水源条件较好。沟梁4社土地贫瘠，水资源匮乏。\n" +
            "\t\t\t\t\t\t    村民主要是以种养殖业为主，近几年,随着市场经济发展形势大好,村民抢抓机遇,根据本地实际,依靠丰富的自然资源,川西主要以种植西瓜和养羊为主，川东主要以种植露地蔬菜、大棚蔬菜和养猪为主。2018年我村农民人均纯收入已达到12000元。"},
        {"modelName":"乡风文明建设","modelImg":"village_detail_mode_2.png","modelContent":"敖靠塔村紧紧围绕乡村振兴战略，结合自身实际，抓阵地、抓评选、抓舆论，全方位强化乡风文明建设，不断提升群众精神风貌，大力推进乡风文明建设。\n" +
            "\t\t\t\t\t\t\t以举办各类文明户评定为抓手，广泛开展“感动人物及身边好人”“新乡贤”等评选活动，共评选“感动人物及身边好人”6人、“新乡贤”7人，在群众中树立榜样，通过评选表彰一批先进典型，形成干群、邻里之间互帮互助、团结友善、关系融洽的良好氛围。\n" +
            "\t\t\t\t\t\t\t    积极推送、宣传身边美德故事、好人好事、道德模范的先进事迹，并设置永久性宣传标语和展板20余块，大力宣传精神文明建设，营造全民参与精神文明建设的氛围。同时，以“文化墙”“文化专栏”等为载体，在潜移默化中引导广大群众崇德向善、见贤思齐，提倡移风易俗，有效提升村民文明素养，引领农村新风尚。"},
        {"modelName":"集体经济","modelImg":"village_detail_mode_1.png","modelContent":"2020年3月26日，沙圪堵镇人大主席薛欣波与敖靠塔村两委班子成员共同研究村集体经济产业项目规划图，合理调整产业布局，谋划规模化养殖业发展，对村集体经济发展做了综合分析，并去实地查看，给予了可行性发展建议。\n" +
            "\t\t\t\t\t\t\t4月中旬，敖靠塔村集体产业项目开始建设，村干部、驻村工作队进行实地勘察。\n" +
            "\t\t\t\t\t\t\t5月中旬，开始耕地，并积极与相关部门对接项目供电、供水\n" +
            "\t\t\t\t\t\t\t6月中旬，项目上水完成，滴灌作业开始，组织两委干部、党员、村民进行播种。\n" +
            "\t\t\t\t\t\t\t9月初，瓜地成熟，组织党员、三委成员一起帮村集体摘西瓜，共收获10万斤西瓜，对接帮扶单位准旗交通运输局帮忙销售。\n" +
            "\t\t\t\t\t\t\t10月中旬，村集体雇佣机器开始刨土豆，共收获10万斤土豆。通过帮扶单位、企业、学校等各渠道全面向市场出售。 \n" +
            "\t\t\t\t\t\t\t杨乃  联系方式 ：13474885885。"}
      ]
    }
  },
  mounted() {
    this.$vux.loading.show({
      text: '努力加载中...'
    });
    this.getVillageDeail();
  },
  methods:{
    getVillageDeail(){
      getAction("phone/api_zknh_wechat_config/getVillageDeail").then(res => {
        let code = res.code;
        this.$vux.loading.hide();
        if ("200" == code) {
          this.detailList = res.result;
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
  }
  .detail-div{
    text-align: center;
    border-radius: 20px;
    background-color: white;
    margin: 10px 10px 10px 10px
  }

  .title{
    font-size: 2rem;
    color: black;
    text-align: center;
    font-family:Cursive;
    font-weight:bold;
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

</style>
