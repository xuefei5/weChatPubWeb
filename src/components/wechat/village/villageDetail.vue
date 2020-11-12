<template>
    <div style="height: 100%;">
      这是详情页面{{id}}
    </div>
</template>

<script>
  import { Masker,XButton } from 'vux'
    export default {
      components: {
        Masker,
        XButton
      },
        name: "villageDetail",
      data(){
          return{
            id:this.$route.query.villageId
          }
      }
    }
</script>

<style scoped>

</style>
