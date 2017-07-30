<template>
  <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>

<script>
export default {
  props:['iconType'],
  created(){
    // console.log(this.iconType) 数字 0 1
    this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },

}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
.iconMap
  display inline-block
  width 12px
  height 12px
  background-size 100% 100%
  background-repeat no-repeat
  &.decrease
      bg-image('decrease_4')
  &.discount
    bg-image('discount_4')
  &.guarantee
    bg-image('guarantee_4')
  &.invoice
    bg-image('invoice_4')
  &.special
    bg-image('special_4')
</style>

