// miniprogram/pages/main/main.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindList: [],
    imgPaths:[
      "../../images/4.jpg",
      "../../images/0.jpg",
      "../../images/1.jpg",
      "../../images/2.jpg",
      "../../images/5.jpg",
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kindList: app.globalData.kindList
    })

    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {
    //     a: 1,
    //     b: 2,
    //   },
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //   },
    // })
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

  },

  doClick: function (event) {
    console.log("【点击ID】", event);
    wx.navigateTo({
      url: "../kindInfo/kindInfo?_info=" + JSON.stringify(event.currentTarget.dataset.item)
    })
  }
})