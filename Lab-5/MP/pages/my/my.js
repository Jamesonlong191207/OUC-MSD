// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"未登录",
    src:'/images/index.png',
    newsList:
    [{id: '304083',
    title: '《光明日报》刊发我校研究员王顺理论文章《不断提高理论素养》',
    poster: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg',
    content: ' 8月9日，《光明日报》第06版“学习贯彻习近平新时代中国特色社会主义思想专刊”版面长篇幅刊发了我校中国特色社会主义理论体系研究中心特约研究员、马克思主义学院博士生王顺题为《不断提高理论素养》的理论文章。文章从“理论素养坚实，才能理想信念坚定”“克服前进道路上的各种困难，需要具备扎实的理论素养”“提升理论素养，必须学懂弄通做实党的创新理论”3个方面全面阐述了不断提高理论素养、坚持用党的创新理论武装头脑的重要性。文章指出，新征程上，面对具有新的历史特点的伟大斗争，迫切需要我们学懂弄通做实党的创新理论，以扎实的理论素养提升战略定力、斗争能力，从而不断取得新的伟大胜利。',
    add_date: '2022-08-09'}],
    num: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onShow: function()
  {
    if(this.data.isLogin)
      this.getMyFavorites();
  },

  goToDetail : function(e)
  {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  },

  getMyinfo: function(e)
  {
    console.log(e.detail.userInfo);
    let info = e.detail.userInfo;
    this.setData({
      isLogin:true,
      src:info.avatarUrl,
      nickName: info.nickName
    })
    this.getMyFavorites();
  },

  getMyFavorites : function()
  {
    let info = wx.getStorageInfoSync();
    let keys = info.keys;
    let num = keys.length;
    let myList = [];
    for(var i = 0;i < num;i++)
    {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);
    }
    this.setData({
      newsList: myList,
      num: num
    });
  },
  
})