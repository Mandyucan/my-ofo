// pages/index/index.js
//调用page入口函数，page函数是微信小程序已经封装好的
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0
    // controls: 
  },
  bindcontroltap: function (e) {
    console.log(e)
    switch (e.controlId) {
      case 1:
        this.movetoCenter();
        break;
      case 2:
        // 调起客户端扫码界面，扫码成功后返回对应的结果
        if (this.timer) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.scanCode({
            success: () => {
              //扫码时，showloading接口
              wx.showLoading({
                title: '正在获取密码',
              })
              console.log(111)
              wx.request({
                url: 'https://www.easy-mock.com/mock/5b42efc51337db27b1c03c7f/ofo/password',
                success: (res) => {
                  // console.log(res)
                  //扫码成功后，隐藏
                  wx.hideLoading();
                  // 跳转页面，显示扫码结果
                  wx.redirectTo({
                    url: '../scanResult/index?password=' + res.data.data.password + '&number=' + res.data.data.number,// 自己配置的页面，需在app.json里配置,(通过问号？传参)通过字符串拼接将密码和编号传到另一个页面
                    success: () => {
                      // 跳转成功后的回调函数，接口showToast
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })
                }
              })
            }
          })
        }
        break;
      case 3:
        wx.navigateTo({
          url: '../warn/index',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../my/index',
        })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options) //通过timer判断是否需要重新扫码
    this.timer = options.timer
    // var self = this;// 将this保存出来，或是用箭头函数
    console.log(this) // this是当前页面的一个实例，由page生成
    wx.getLocation({
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      // success: function(res) {
      //   self.setData({
      //     longitude: res.longitude,
      //     latitude: res.latitude
      //   })
      // },
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          controls: [
            {
              id: 1,
              iconPath: "/images/location.png",
              position: {
                width: 50,
                height: 50,
                left: 20,
                top: res.windowHeight - 80
              },
              clickable: true
            },
            {
              id: 2,
              iconPath: "/images/use.png",
              position: {
                width: 90,
                height: 90,
                left: res.windowWidth / 2 - 45, // 居中
                top: res.windowHeight - 100,
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: "/images/warn.png",
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 80,
                left: res.windowWidth - 70
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: "/images/avatar.png",
              position: {
                width: 50,
                height: 50,
                top: res.windowHeight - 155,
                left: res.windowWidth - 70
              },
              clickable: true
            },
            {
              id: 5,
              iconPath: "/images/marker.png",
              position: {
                width: 30,
                height: 45,
                top: res.windowHeight / 2 - 45,
                left: res.windowWidth / 2 - 15
              }
            }
          ]
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
  },
  movetoCenter: function () {
    this.mapctx.moveToLocation();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onshow')
    // 创建一个map上下文，和canvas上下文类似
    this.mapctx = wx.createMapContext('ofo-map');
    this.movetoCenter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onhide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onunload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})