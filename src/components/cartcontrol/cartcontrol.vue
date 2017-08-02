<template>
  <div class="cartcontrol">
    <!--减少 数量-->
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart()">
          <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <!--
      食物数量
    -->
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <!--增加数量-->
    <div class="cart-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
export default {
  props:['food'],
  data(){
    return {

    }
  },
  methods:{
    decreaseCart(){

    },
    addCart(){

    }
  }
}
</script>

<style lang="stylus">
.cartcontrol
  .cart-decrease
    display inline-block
    padding 6px
    transition all .4s linear
    .inner
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
      transition all 0.4s linear
    

</style>

