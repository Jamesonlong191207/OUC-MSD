//index.js
//获取应用实例
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    avatarUrl: defaultAvatarUrl,
    userInfo: {},
    hasUserInfo: false,
    is_admin: 1,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    is_bind : false,
    canIUseGetUserProfile: false,
    intvals : 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow(){
    this.onPullDownRefresh()
  },
  onLoad: function () {
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserInfo({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          app.globalData.is_user_data = true
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
      
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.errMsg == 'getUserInfo:ok')
    {
      app.globalData.is_user_data = true
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })


      // 异步请求后台  进行权限判断


    }else{
    }
  },
    /**
   * 跳转页面
   */
  jump: function (e) {
    let url = e.target.dataset.event
    wx.navigateTo({
      url: url,
    })
  },
  onPullDownRefresh(){
    this.onLoad()
  },

  onChooseAvatar(e) {
    this.setData({
      avatarUrl :e.detail.avatarUrl
    })
    console.log(e.detail.avatarUrl);
  },

  //抽检历史记录
  cjRecord(){
    wx.navigateTo({
      url: '/pages/cjRecord/cjRecord',
    })
  },
  //积分获取记录
  intRecord(){
    wx.navigateTo({
      url: '/pages/intRecord/intRecord',
    })
  },
  //上传记录
  subRecord(){
    wx.navigateTo({
      url: '/pages/subRecord/subRecord',
    })
  },
})
