
var util = require('../../utils/util.js')

Page({
  data: {
    input:'',
    // coverImg:'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg',
    playVideo:'', //https://vdept.bdstatic.com/6c74324a335a75436149444d49717270/5375455778314954/df25fef9209a2ecf7c965e49fcb863201b8345dca6f93644d8a61fb8deac104cade8ea2d2dc0827f87b2b97b0c7a1ceb6c94d6f2844249b198bc0f9e4634baac.mp4?auth_key=1587307515-0-0-ea558b609fbcfe4d8d4c570e3bdc2a77
    content:'',
    title:'',
    isInputVal:false
  },
  InputInfo: function (e) {
    console.log(e)
    if(this.data.isInputVal){
      this.setData({
        isInputVal:false
      })
    }
    this.data.input = e.detail.value;
  },
  // 清空链接
  clearInput(){
    this.setData({
      input:''
    })
  },
  downLoad(){
    
    console.log('下载')
  },
  errorToast(error){
    wx.showToast({
      title: error,
      icon: 'none',
      duration: 2000
    })
  },
  Tianapi: function () {
    let inputVal = this.data.input
    if(!inputVal){
      this.setData({
        isInputVal:true
      })
      this.errorToast('请输入要转换的视频链接')
      return false
    }
    if(!inputVal.includes('http')){
      this.errorToast('链接错误，请检查链接')
      return false
    }
    console.log(45555)
    this.setData({
      playVideo:'https://vdept.bdstatic.com/6c74324a335a75436149444d49717270/5375455778314954/df25fef9209a2ecf7c965e49fcb863201b8345dca6f93644d8a61fb8deac104cade8ea2d2dc0827f87b2b97b0c7a1ceb6c94d6f2844249b198bc0f9e4634baac.mp4?auth_key=1587307515-0-0-ea558b609fbcfe4d8d4c570e3bdc2a77'
    })
    const that = this
      // wx.request({
      // url: util.TXAPI_BASE_URL + '/txapi/shortvideo/', //天行数据视频去水印接口
      //   data: {
      //     key: util.TXAPI_KEY,
      //     url: this.data.input,
		  
      //   },
      //   success: function (res) {
      //     console.log(res.data)
      //     if (res.data.code == 200) {
      //       that.setData({
      //         title: res.data.newslist[0].explain,
      //         content: res.data.newslist[0].videourl,
      //         // coverImg:res.data.coverimg
      //       })
      //     } else {
      //       console.error('错误码：' + res.data.code )
      //         // + '，错误提示：' + res.data.msg + '，接口文档：https://www.tianapi.com/apiview/71'
      //       wx.showModal({
      //         title: '视频去水印',
      //         content: res.data.msg,
      //         showCancel: false,
      //         success: function (res) {
      //           if (res.confirm) {
      //             console.log('用户点击确定')
      //           }
      //         }
      //       })
      //     }
      //   },
      //   fail: function (err) {
      //     console.log(err)
      //     console.log(5555)
      //   }
      // })
    
  },
  handleDownload(e) {
    let link = this.data.playVideo//e.currentTarget.dataset.link;
    console.log(e)
    let fileName = new Date().valueOf();
    wx.downloadFile({
      url: link,
      filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
      success: res => {
        console.log(res);
        let filePath = res.filePath;
        wx.saveVideoToPhotosAlbum({
          filePath,
          success: file => {
            $Message({
              content: '下载成功',
              type: 'success'
            })
            let fileMgr = wx.getFileSystemManager();
            fileMgr.unlink({
              filePath: wx.env.USER_DATA_PATH + '/' + fileName + '.mp4',
              success: function (r) {

              },
            })
          },
          fail: err => {
            console.log(err)
            if (err.errMsg === 'saveVideoToPhotosAlbum:fail auth deny') {
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: data => {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击下载即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                  })
                }
              })
            }
          }
        })
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
