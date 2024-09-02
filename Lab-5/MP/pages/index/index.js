// pages/index/index.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //幻灯片素材
    swiperImg: [],
  },

  goToDetail2: function(e) 
  {
    
  
  },
  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function(e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取新闻列表
    let list = common.getNewsList()
    //更新列表数据
    this.setData({
      newsList: list
    })
    console.log(list);
    let temp_result = [];
    for(let i = 0; i < list.length;i++)
    {
      let temp = {src:[list[i].poster],id:[list[i].id]};
      temp_result.push(temp);
    }
    this.setData({swiperImg : temp_result});
  },
})