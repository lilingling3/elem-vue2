<template>
<div>
  <!--购物车-->
  <div class="shopCart">

    <div class="content">
      <div class="content-left" @click="listToggle">
        <div class="logo-wrapper">
          <!--徽章 显示有多少个-->
          <div class="badge" v-show="totalCount">{{totalCount}}</div>
          <div class="logo"  :class="{'active':totalPrice}">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price" :class="{'active':totalPrice}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice}">{{payDesc}}</div>
    </div>
    <!-- -->
     <div class="ball-container">
        <transition name="drop" v-on:before-enter="beforeEnter"
            v-on:enter="enter" v-on:after-enter="afterEnter"
            v-for="(ball,index) in balls">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
        </transition>
     </div>
    <!--显示订单-->
    <transition name="transHeight">
      <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="setEmpty()">清空</span>
          </div>
          <div class="list-content" ref="foodlist">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </transition>
  </div>
  <!--遮罩-->
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
  </transition>
</div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'

export default {
  props: {
    selectFoods: {
      type: Array,
      default: []
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0 // 设置默认值
    }
  },
  data(){
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      listShow: false
    }
  },
  created(){
    // 绑定事件
    this.$root.eventHub.$on('cart.add',this.drop)
  },
  computed:{
    totalCount(){

    },
    totalPrice(){

    },
    payDesc(){

    },

  },
  methods:{
    listToggle(){

    },
    setEmpty(){

    },
    hideBackdrop(){

    },
    showBackdrop(){

    },
    beforeEnter(){

    },
    enter(){

    },
    afterEnter(){

    }
  },
  components:{cartcontrol}
}
</script>

<style lang="stylus">
.shopCart
  position fixed
  left 0
  bottom 0
  width 100%
  height 48px
  z-index 50
  .content
    display flex
    background #141d27
    .content-left
      flex 1
      height 48px
      .logo-wrapper
        display inline-block
        vertical-align top
        position relative
        top -10px
        width 56px
        height 56px
        line-height 56px
        border-radius 50%
        background: #141d27
        margin 0 12px
        padding 6px
        box-sizing border-box
        text-align center
        .badge
          position absolute
          top 0
          right 0
          background: rgb(240,20,20);
          color #fff
          width 24px
          height 16px
          line-height 16px
          font-size 9px
          box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
          font-weight 700
          border-radius 16px
          text-align center
        .logo
          width 100% // 父元素内容区的100%
          height 100%
          background: #2b343c
          border-radius 50%
          font-size 24px
          color: #80858a
          line-height 44px
          font-weight 700
          &.active
            background: rgb(0,160,220)
            color #fff
      .price
        display inline-block
        vertical-align top
        font-size 16px
        margin-top 12px
        padding-right 12px
        box-sizing border-box
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 24px
        border-right 1px solid rgba(255,255,255,0.1)
        &.active
          color #fff

</style>


