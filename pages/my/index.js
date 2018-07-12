// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      userUrl: '',
      nickname: '未登录'
    },
    actionText: '登录',
    btnType: 'primary'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo:{
            userUrl: res.data.userInfo.userUrl,
            nickName: res.data.userInfo.nickName
          },
          actionText: res.data.actionText,
          btnType: res.data.btnType
        })
      },
    })
  },
  // 登录
  login: function() {
    if(this.data.actionText === '登录') {
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
              this.setData({
                userInfo: {
                  userUrl: res.userInfo.avatarUrl,
                  nickname: res.userInfo.nickName,
                },
                actionText: '退出登录',
                btnType: 'warn'
              })
              // 用户信息存储
              wx.setStorage({
                key: 'userInfo',
                data: {
                  userInfo: {
                    userUrl: res.userInfo.avatarUrl,
                    nickname: res.userInfo.nickName,
                  },
                  actionText: '退出登录',
                  btnType: 'warn'
                },
              })
            }
          })
        }
      })
    }else{ //退出登录
    // 清除缓存
      wx.removeStorageSync('userInfo')
      this.setData({
        userInfo: {
          userUrl: '',
          nickname: '未登录'
        },
        actionText: '登录',
        btnType: 'primary'
      })
    }
  },
  
  // 跳转至我的钱包
  movetoWallet: function(){
    wx.navigateTo({
      url: '../wallet/index',
    })
  },
  
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})