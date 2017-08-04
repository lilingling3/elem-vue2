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
    <!-- 添加订单 滚动效果
         添加钩子函数
    -->
     <div class="ball-container">
       <!--
         v-for 必须加index 否则会报错
       -->
        <transition name="drop" v-on:before-enter="beforeEnter"
            v-on:enter="enter" v-on:after-enter="afterEnter"
            v-for="(ball,index) in balls" :key='index'>
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
      default: function () { // 必须使用工厂函数返回值
        return []
      }
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
    // 绑定事件 需要监听的事件
    // 获取按钮组件的点击的元素，用在drop方法里
    // console.log(this.$root.eventHub)
    this.$root.eventHub.$on('cart.add',this.drop)
  },
  computed:{
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food)=>{
        count += food.count
      })
      return count
    },
    // 总价格
    totalPrice(){
      let total = 0;
      this.selectFoods.forEach((food) =>{
        if(food.count){
          total += food.price * food.count
        }
      })
      return total
    },
    payDesc(){
      let diff = this.minPrice - this.totalPrice;
      if(!this.totalPrice){
        return `￥${this.totalPrice}起送`
      }else if(diff > 0){
        return `还差￥${diff}元`
      }else{
        return '去结算'
      }
    },
    // 是否显示遮罩
    showBackdrop(){
      if(this.listShow && this.totalPrice){
        return true
      }
      this.listShow = false;
      return false
    }
  },
  methods:{
    drop(el){
      // el 表示目标元素
      for(var i=0,l = this.balls.length;i<l;i++){
        let ball = this.balls[i]
        if(!ball.show){
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball)
          return
        }
      }
    },
    // 订单列表可滚动
    _initScroll(){
      this.foodlistScroll = new BScroll(this.$refs.foodlist,{
        click: true  // 当设置为true 移动端才有效果
      })
    },
    listToggle(){
      if(!this.selectFoods.length){
        return
      }
      this.listShow = !this.listShow;
      // console.log(this.listShow)
      if(this.listShow){
        this.$nextTick(()=>{
          if(!this.foodlistScroll){
            this._initScroll()
          }else{
            this.foodlistScroll.refresh()
          }
        })
      }
    },
    // 清空
    setEmpty(){
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideBackdrop(){
      this.listShow = false
    },
    beforeEnter(el){
      console.log(el)
      let count = this.balls.length;
      while(count--){
        let ball = this.balls[count];
        if(ball.show){
          let rect = ball.el.getBoundingClientRect();
          // console.log(rect.left)
          // console.log(rect.top)
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          // console.log(x)
          // console.log(y)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform =  `translate3d(0,${y}px,0)`;

          let inner = el.querySelector('.inner-hook');
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }

    },
    enter(el){
      el.offsetHeight // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      // 能解决每次出现白底效果
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'

        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter(el){
      let ball = this.dropBalls.shift() // 删除第一个并返回第一个
      if(ball){
        ball.show = false;
        el.style.display = 'none'
      }

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
            background rgb(0,160,220)
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
      .desc
        position relative
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        font-size 10px
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 14px
    .content-right
      flex 0 0 105px
      font-size 12px
      font-weight 700
      background #2b343c
      color rgba(255,255,255,0.4)
      line-height 48px
      text-align center
      &.enough
        background #00b43c
        color white
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      &.drop-enter,&.drop-enter-active
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0,160,220)
          transition all 0.4s linear
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    background #fff
    transform translate3d(0,-100%,0)
    z-index -1
    &.transHeight-enter-active,&.transHeight-leave-active
      transition all 0.5s
    &.transHeight-enter,&.transHeight-leave-active
      transform translate3d(0,0,0)
    .list-header
      height 40px
      line-height 40px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      .title
        display inline-block
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
        padding-left 18px
      .empty
        position absolute
        right 8px
        font-size 12px
        color rgb(0,160,220)
        padding 0 10px
    .list-content
      max-height 217px
      overflow hidden
      .food
        position relative
        display flex
        height 48px
        margin 0 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .name
          flex 1
          font-size 14px
          color rgb(7,17,27)
          line-height 48px
          font-weight 700
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          padding 0 12px 0 18px
          line-height 48px
        .cartcontrol-wrapper
          font-size 14px
          margin-top 6px
.backdrop
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  background rgba(7,17,27,0.6)
  backdrop-filter blur(10px) // 模糊效果
  z-index 40
  &.fade-backdrop-enter-active,&.fade-backdrop-leave-active
    transition opacity 0.5s
  &.fade-backdrop-enter,&.fade-backdrop-leave-active
    opacity 0
</style>


