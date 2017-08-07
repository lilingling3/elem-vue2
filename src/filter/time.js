// 定义 时间过滤
import Vue from 'vue'
import moment from 'moment'

Vue.filter('time',function(value, formatString){
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment(value).format(formatString)
})
