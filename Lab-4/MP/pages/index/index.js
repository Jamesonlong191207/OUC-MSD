// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danmuTxt:'',
    list : 
    [
      {
        id : '299371',
        title : '杨国宜先生口述校史实录',
        videoUrl: 'cloud://test-7gils3dba8329fb3.7465-test-7gils3dba8329fb3-1328827207/1.mp4'
      },
      {
        id : '299396',
        title : '唐成伦先生口述校史实录',
        videoUrl: 'cloud://test-7gils3dba8329fb3.7465-test-7gils3dba8329fb3-1328827207/2.mp4'
      },
      {
        id : '299378',
        title : '倪光明先生口述校史实录',
        videoUrl: 'cloud://test-7gils3dba8329fb3.7465-test-7gils3dba8329fb3-1328827207/3.mp4'
      },
      {
        id : '299392',
        title : '吴兴仪先生口述校史实录',
        videoUrl: 'cloud://test-7gils3dba8329fb3.7465-test-7gils3dba8329fb3-1328827207/4.mp4'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.videoCtx = wx.createVideoContext('myVideo');
  },

  playVideo: function(e)
  {
    // 如果当前有播放中的视频，先停止
    this.videoCtx.stop();
    this.setData({
      src: e.currentTarget.dataset.url
    }, () => {
      setTimeout(() => {
        this.videoCtx.play();
      }, 1000); // 延迟500毫秒播放视频
    });
  },

  getDanmu : function(e)
  {
    this.setData({
      danmuTxt:e.detail.value
    })
  },
  sendDanmu : function(e)
  {
    let text = this.data.danmuTxt;
    this.videoCtx.sendDanmu({
      text: text,
      color:this.getRandomColor() 
    })
  },

  getRandomColor :function() {
    let rgb = []
    for(let i = 0; i < 3; ++i)
    {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? 'O' + color : color;
      rgb.push(color)
    } 
    return '#' + rgb.join('')
},
videowait: function() {
  wx.showLoading({
    title: '缓冲中',
  });
},
videoprogress: function(e) {
  if (e.detail.buffered >= 15) { 
    wx.hideLoading(); 
  }
},
videoerror : function()
{
  wx.showToast({
    title: '视频播放出错，将自动刷新',
    icon : 'error',
    duration : 2000
  });
  wx.startPullDownRefresh();
}
})
