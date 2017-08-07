<template>
    <transition name="move">
      <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
        <div class="foodDetail">
          <div class="back" @click="showToggle()">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  props:['food'],
  data(){
    return {
      showDetail: false,
    }
  },
  components:{},
  computed:{},
  methods:{
    showToggle(){
      this.showDetail = !this.showDetail;
      
    }
  }
}
</script>

<style lang="stylus">

</style>


