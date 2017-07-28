<template>
  <div>
    <v-header :seller='seller'></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header'
import axios from 'axios'
const ERR_OK = 0

export default {
  data(){
    return {
      seller:{}
    }
  },
  created(){
    axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller;
      // console.log(this.seller)
    })
  },
  components:{
    'v-header':header // 注入模块
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
 @import 'common/stylus/index'


</style>

