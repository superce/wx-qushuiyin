
/*

本文件由天行数据在2020-04-32 04:16:32时自动生成，如无必要请忽修改
微信：txapibot
接口名称：视频去水印
文档地址：https://www.tianapi.com/apiview/71

*/

var TXAPI_BASE_URL = 'https://api.tianapi.com';  //天行数据接口域名,官网www.tianapi.com
var TXAPI_KEY = '4db0c4300f21404b788c4d12b869ef7c';  //请填写你在控制台获得的apikey

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  TXAPI_BASE_URL: TXAPI_BASE_URL,
  TXAPI_KEY: TXAPI_KEY
}
