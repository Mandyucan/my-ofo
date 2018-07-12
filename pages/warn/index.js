// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemsValue: [
      {
        value: "私锁私用",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "车牌缺损",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "轮胎坏了",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "车锁坏了",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "违规乱停",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "密码不对",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "刹车坏了",
        checked: false,
        color: "#b9ddo8"
      },
      {
        value: "其他故障",
        checked: false,
        color: "#b9ddo8"
      }
    ],
    picUrls: [],
    checkboxValues: [],
    btnColor: '#f2f2f2',
    actionText: '拍摄/相册',
    inputValue: {
      num: 0,
      desc: ''
    }
  },

  // 故障报修选项：通过事件委托，给checkbox-group绑定事件
  changeCheckbox: function (e) {
    console.log(e);
    var _value = e.detail.value; // 储存着所有value的值
    if (_value.length == 0) {
      this.setData({
        btnColor: '#f2f2f2',
        checkboxValues: []
      })
    } else {
      this.setData({
        btnColor: '#359eff',
        checkboxValues: _value
      })
    }
  },

  // 点击拍照
  clickPhoto: function () {
    console.log(111);
    // 调用接口：从相册或拍照里选择照片
    wx.chooseImage({
      success: (res) => {
        console.log(res) // tempFilePaths里存有图片路径
        var _picUrls = this.data.picUrls;
        var tfs = res.tempFilePaths;
        for (let temp of tfs) {
          _picUrls.push(temp); // 将tempFilePaths添加到_picUrls保存
          this.setData({
            picUrls: _picUrls,
            actionText: '+'
          })
        }
      },
    })
  },

  // icon点击事件，删除照片,绑定自定义数据
  delPic: function (e) {
    console.log(e)
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    // 调用数组方法，splice（2，1），指从第二位开始剪切，剪切一个
    _picUrls.splice(index, 1);
    this.setData({
      picUrls: _picUrls,
    })
    if (_picUrls.length == 0) {
      this.setData({
        actionText: '拍摄/相册'
      })
    }
  },

  //车牌号绑定bindinput事件
  changeNumber: function (e) {
    console.log(e)
    this.setData({
      inputValue: {
        num: e.detail.value,
        desc: this.data.inputValue.desc
      }
    })
  },
  //备注绑定bindinput事件
  changeDesc: function (e) {
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: e.detail.value
      }
    })
  },

  // 提交
  submit: function () {
    if (this.data.picUrls.length > 0 && this.data.checkboxValues.length > 0) {
      wx.request({
        url: 'https://www.easy-mock.com/mock/5b42efc51337db27b1c03c7f/ofo/submitSuccess',
        // method: 'POST',
        // data: {
        //   checkboxValues: this.data.checkboxValues,
        //   picUrls: this.data.picUrls,
        //   inputValue: this.data.inputValue
        // }, // 本应是发送POST请求将反馈结果发送后台，但因是假数据，直接发送GET请求数据模拟即可
        success: (res) => {
        //  console.log(res)
        //提交提示框，微信接口showToast
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
        }
      })
    }else{
      wx.showModal({
        title: '请填写完整的反馈信息',
        content: '别墨迹，快去填啦',
        confirmText: '我怂我填',
        cancelText: '我偏不填',
        success: (res)=> {
          // console.log(res) // 返回cancel：false/ confirm: true
          if(!res.confirm) {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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