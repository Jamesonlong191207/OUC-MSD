// index.js
Page({
  data: {
    levels:[
      'level01.png',
      'level02.png',
      'level03.png',
      'level04.png'
    ]
  },
  chooseLevel:function(e){
    let level=e.currentTarget.dataset.level
    wx.navigateTo({
      url:'../game/game?level='+level
    })
  },



})
