// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:12345,
    hour:0,
    minute:0,
    second:0,
    activeText:"正在计费",
    clickBtn: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)// options为页面跳转所带来的参数 number：12345
    this.setData({
      number: options.number
    })
    let h = 0;
    let m = 0;
    let s = 0;
    this.timer = setInterval(() => {
      this.setData({
        second: s++ // 当s=59时，实际应等于60了，m=1，延迟1秒执行
      })
      if(s == 60) {
        s = 0;
        m ++;
        setTimeout(() => { // 利用setTimeout延期一秒
          this.setData({
            minute: m
          })
        },1000) 
        if(m == 60) {
          m = 0;
          h ++;
          setTimeout(() => { // 同理，利用setTimeout延期一秒
            this.setData({
              hour: h
            })
          },1000);
        }
      }
    },1000)
  },


  //结束骑行: activeText改变，结束骑行button不能再次点击
  endride: function() {
    clearTimeout(this.timer);
    this.timer = "" //flag：判断回到地图时，是否是骑行状态
    this.setData({
      activeText: "本次骑行时间",
      clickBtn: true
    })
  },

  //回到地图：1.正在骑行过程中回到地图，此页面挂载到后台运行，后台计时还在继续；2.结束骑行后点击回到地图，真正跳转到主页，此页面销毁
  movetoIndex: function() {
    if(this.timer == "") {
      wx.redirectTo({
        url: '../index/index',
      })
    }else{
      wx.navigateTo({
        url: '../index/index?timer='+this.timer, //与index.js传参
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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