Page({

  getcity: function(callback){
    var city_data = this.data.region;
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?',
      data: {
        location: city_data[2],
        adm: city_data[1],
        number: '1',
        key: '09f699e075e04fa09abfda409200ebeb'
      },
      success: function(res){
        var city_id = res.data.location[0].id;
        callback(city_id); // 在请求成功后调用回调函数，传递city_id
      }
    });
  },
  
  getWeather: function(){
    var that = this;
    // 获取城市ID并在回调中使用它
    this.getcity(function(city_id) {
      // 这里继续发起请求获取天气数据
      wx.request({
        url: 'https://devapi.qweather.com/v7/weather/now?',
        data: {
          location: city_id,
          key: '09f699e075e04fa09abfda409200ebeb'
        },
        success: function(res){
          that.setData({now: res.data.now});
        }
      });
    });
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    region:['山东省','青岛市','黄岛区'],
    now:{
      text : '未知',
      temp : '0',
      humidity : '0',
      pressure : '0',
      vis : '0',
      windDir : '0',
      windSpeed : '0',
      windScale : '0',
      icon : '999'
    }
  },
  regionChange: function(e){
    this.setData({region: e.detail.value});
    this.getWeather();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
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