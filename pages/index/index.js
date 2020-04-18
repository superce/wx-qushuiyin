
var util = require('../../utils/util.js')

Page({
  data: {
    input:''
  },
  InputInfo: function (e) {
    this.data.input = e.detail.value;
  },
  Tianapi: function () {
    var that = this

      wx.request({
      url: util.TXAPI_BASE_URL + '/txapi/shortvideo/', //天行数据视频去水印接口
        data: {
          key: util.TXAPI_KEY,
          url: this.data.input,
		  
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.code == 200) {
            that.setData({
              title: res.data.newslist[0].explain,
              content: res.data.newslist[0].videourl
            })
          } else {
            console.error('错误码：' + res.data.code )
              // + '，错误提示：' + res.data.msg + '，接口文档：https://www.tianapi.com/apiview/71'
            wx.showModal({
              title: '视频去水印',
              content: res.data.msg,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        },
        fail: function (err) {
          console.log(err)
          console.log(5555)
        }
      })
    
  },

  onLoad: function () {
    var that = this
    //转发分享
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.setNavigationBarTitle({
      title: '全能去水印助手',
    }) 
  }
})
