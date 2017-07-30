<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
  const LENGTH = 5 
  const CLS_ON = 'on' // 全星
  const CLS_HALF = 'half' // 半星
  const CLS_OFF = 'off'//空白

export default {
  props:['size','score'],
  data(){
    return {}
  },
  computed:{
    starType(){
      return 'star-' + this.size;// 根据size 绝对星星大小
    },
    itemClasses(){
      // var test = 3.8;
      // console.log(this.score) // 4.2 
      let result = [];
      let score = Math.floor(this.score*2)/2;// 得到 整数  或者 .5 的数字 
      // 如果是整数则表示是 整数或者小数部分小于5
      // 否则表示余数大于5
      // console.log(score)
      let hasDecimal = score % 1 !== 0;//取余数 看有没有余数  如果余数 是0 表示是整数 否则就是小数
      let integer = Math.floor(score);
      // console.log(integer)//4 整数
      for(let i=0;i<integer;i++){
        result.push(CLS_ON)
      }
      if(hasDecimal){
        result.push(CLS_HALF)
      }
      while(result.length<LENGTH){ // 使长度达到5
        result.push(CLS_OFF)
      }
      return result
    }
  },
}
</script>

<style lang="stylus">
 @import "../../common/stylus/mixin.styl"
 .star
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 100% 100%
      &:last-child
        margin-right 0
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')  
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 100% 100%
      &:last-child
        margin-right 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')  
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 100% 100%
      &:last-child
        margin-right 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')  
</style>
