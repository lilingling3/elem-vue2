<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src='seller.avatar' width="64" height="64"/>
        </div>
        <div class="content">

          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>

          <div class="description">
            {{seller.description + '/' + seller.deliveryTime + '分钟到达'}}
          </div>

          <div class="supports" v-if='seller.supports'>
              <div class="supports_desc">
                  <div class="icon" :class="iconClassMap[seller.supports[0].type]"></div>
                  <div class="text">{{seller.supports[0].description}}</div>
              </div>
          </div>

        </div>

         <div class="support-count" v-if='seller.supports' @click="showDetail()">
                <span class="count">{{seller.supports.length+'个'}}</span>
                <i class="icon-keyboard_arrow_right"></i>
          </div>

      </div>
      <div class="bulletin-wrapper" @click="showDetail()">
          <span class="bulletin-title"></span>
          <span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>

  </div>
</template>

<script>
export default {
  props:['seller'],
  data(){
    return {}
  },
  created(){
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  comments:{},
  methods:{
    showDetail(){

    },
  }
}
</script>

<style lang="stylus">
@import  '../../common/stylus/mixin'

.header
  position relative
  background rgba(7,17,27,0.5)
  color #fff
  // blur 10px
  overflow hidden
  .content-wrapper
    position relative
    display  flex
    padding 24px 12px 18px 24px
    font-size 12px
    .avatar
      img
        border-radius 2px
    .content
      margin-left 16px
      .title
        margin 2px 0 8px 0
        font-size 16px
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 16px
          font-size 16px
          font-weight bold
          line-height 18px
      .description
        font-size 12px
        margin-bottom 10px
      .supports
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          line-height 12px
          font-size 10px


</style>
