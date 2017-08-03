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
import Vue from 'vue'

export default {
  props:['food'],
  data(){
    return {

    }
  },
  methods:{
    // 减少购物车
    decreaseCart(){
      if(!event._constructed || !this.food.count){
        return
      }
      this.count--;
    },
    // 增加购物车
    addCart(event){
      console.log(event.target);
      // event_constructed  Better-scroll 派发这个事件，原生没有这个事件
      if(!event._constructed){
        return
      }
      if(!this.food.count){
        Vue.set(this.food,'count',0)
      }
      this.food.count++;
      //eventHub 组件之间进行通信
      this.$root.eventHub.$emit('cart.add',event.target) // 触发事件
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
    &.fadeRotate-enter-active, &.fadeRotate-leave-active
      transform translate3d(0,0,0) // 开启3d
      .inner
        display inline-block
        transform rotate(0)
    &.fadeRotate-enter, &.fadeRotate-leave-active
      opacity 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    text-align center
    padding 6px 0
  .cart-add
    display inline-block
    vertical-align top
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
    padding 6px 0

</style>

