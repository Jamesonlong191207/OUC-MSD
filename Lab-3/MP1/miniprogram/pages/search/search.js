// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的内容
    inputTxt: null,
    //热门搜索
    hotSearchItems: [],
    //常用的分类
    kindList: [],
    //搜索到的所有项目
    searchItmes: [],
    //选择搜索到的项目
    selectItem: {},
    //扫描到的物品
    scanItems: [],
    //百度Token
    baiduToken: null,
    //是否隐藏详细信息弹框
    isHiddenInfoModal: true,
    isHiddenEditModal: true,
    //是否隐藏扫描物品的弹窗
    isHiddenScanModal: true,

    //你的apisecret 你的apiKey
    apisecret : "CLJVLWkQ99CqdfPJ3AHzkpCm1LNGnFYn",
    apikey : "e0uVtpUMQePHrB32IQULZrM1"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kindList: getApp().globalData.kindList,
    });

    this.onPullDownRefresh();
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({
      inputTxt: null
    });
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;

    if (that.data.inputTxt) {
      wx.stopPullDownRefresh();
      return;
    }

    that.setData({
      hotSearchItems: []
    })

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });


    this.getHotItems().then(res => {
      console.log("【热搜项目】", res)

      that.setData({
        hotSearchItems: res.result.data
      })

      wx.stopPullDownRefresh()

      //隐藏加载界面
      wx.hideLoading();
    })
  },

  //获取热门搜索
  getHotItems: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'getHotItems',
        success: resolve,
        fail: reject
      })
    })
  },

  //获取输入的搜索内容
  getInput: function (e) {
    if (e.detail.value == "") {
      this.setData({
        inputTxt: null
      })
    } else {
      this.setData({
        inputTxt: e.detail.value
      })
    }
  },

  //点击搜索按钮
  doClick: function (event) {
    var that = this;
    //判断输入的内容是否有效
    if (that.data.inputTxt == null) {
      wx.showToast({
        title: '请输入有效内容！！',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }

    //清空历史搜索项
    that.setData({
      searchItmes: []
    })

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });


    this.searchFunction().then((res) => {
      that.gettype().then((ress) =>{
        console.log('[辣鸡类型]' , ress.result.data)
        let trash_type = {}
        for(let k in ress.result.data){
          let v = ress.result.data[k];
          trash_type[v.id] = v.name
        }
        for(let k in res.result.data){
          let v = res.result.data[k];
          res.result.data[k].type = trash_type[v.category]
        }


        
      
      console.log("【搜索数据】", res);

      that.setData({
        searchItmes: res.result.data
      })

      //隐藏加载界面
      wx: wx.hideLoading();
      console.log(res.result.data)
      if (res.result.data.length == 0) {
        wx.showToast({
          title: '暂时搜索不到该选项, 我们会再接再厉的！！',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }
      })

    })
  },

  gettype:function(){
    console.log("[获取类型]")
    var that = this;
    return new Promise(function(resolve, reject){
      wx.cloud.callFunction({
        name: 'type',
        data: {
        },
        success: resolve,
        fail: reject
      })
    })
  },
  //搜索动作
  searchFunction: function () {
    console.log("【开始搜索】", this.data.inputTxt)

    var that = this;
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: 'search',
        data: {
          _txt: that.data.inputTxt
        },
        success: resolve,
        fail: reject
      })
    })
  },

  //选择项目
  doClickItem: function (event) {
    console.log("【选择的项目】", event)
    var _type = event.currentTarget.dataset.type;
    var _name = event.currentTarget.dataset.name;
    var _id = event.currentTarget.id;

    console.log("【选择的ID】", _id)

    //增加搜索数目
    // wx.cloud.callFunction({
    //   name: 'inc',
    //   data: {
    //     id: _id
    //   },
    //   success: function (res) {
    //     console.log("【增加热搜次数】", res)
    //   }
    // })

    let text;
    for (var i = 0; i < this.data.kindList.length; i++) {
      if(_type == '可回收垃圾')
      {
        _type = '可回收物'
      }
      if(_type == '厨余垃圾')
      {
        _type = '湿垃圾'
      }
      if (this.data.kindList[i].text == _type) {
        //显示详细信息
        var itemInfo = {
          _txt: _name,
          _type: this.data.kindList[i]
        }

        this.setData({
          selectItem: itemInfo,
          isHiddenInfoModal: false
        })

        console.log("【详细】", this.data.selectItem)
        return;
      }
    }
  },

  //点击热门搜索
  doClickHotItem: function (event) {
    console.log("【点击热门搜索】", event)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })

    //开始搜索
    this.doClick(null);
  },

  //点击扫描按钮
  doClickCamera: function () {
    var that = this;

    //复位扫描的项目
    that.setData({
      scanItems: null
    })

    // //首先授权相机的使用
    that.checkAuth().then(res => {
      console.log(res);
    })

    //获取BaiduTaken
    if (!that.baiduToken) {
      that.getBaiduTaken();
    }
    that.getImage().then(res => {
      console.log(res)
      var filePaht = res.tempFilePaths[0];
      
      console.log("【获取图片地址】", filePaht)

      wx.getFileSystemManager().readFile({
        filePath: filePaht,
        encoding: "base64",
        success: res => {
          console.log("【读取图片数据pass】", res.data)

          //扫描图片物品
          that.scanImageInfo(res.data).then(res => {
            console.log("扫描图片物品", res)

            that.setData({
              scanItems: res.data.result
            })

            if (that.data.scanItems) {
              that.setData({
                isHiddenScanModal: false
              })
            } else {
              wx.showToast({
                title: '很遗憾没有识别到物品哦！！',
                icon: 'none',
                duration: 2000,
                mask: true
              })
            }
          })
        },
        fail: res => {
          console.log("【读取图片数据fail】", res)
          wx.showToast({
            title: '读取图片数据fail',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      })
    })
  },

  //获取百度taken
  getBaiduTaken: function () {
    var that = this;
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${that.data.apikey}&client_secret=${that.data.apisecret}`;

    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (res) {
        console.log("【getBaiduTaken提示pass】", res);
        that.setData({
          baiduToken: res.data.access_token
        })
      },
      fail: function (res) {
        console.log("【getBaiduTaken提示fail】", res);
      }
    })
  },

  //获取本地图片
  getImage: function () {
    var that = this;
    // 选择图片
    return new Promise(function (resolve, reject) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })

    })
  },
  
  //拍照暂无使用
  takeImage: function () {
    const ctx = wx.createCameraContext()

    return new Promise(function (resolve, reject) {

      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log("【拍照成功】", res)
          resolve(res)
        },
        fail: res => {
          console.log("【拍照失败】", res)
          reject(res)
        }
      })

    })
  },

  //判断是否已经授权
  checkAuth: function () {
    return new Promise(function (resolve, reject) {

      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success: res => {
                console.log("用户同意授权")
                resolve(res)
              },
              fail: res => {
                console.log("用户拒绝授权")
                wx.showToast({
                  title: '需要右上角设置中授权',
                  icon: 'none',
                  duration: 3000,
                  mask: true
                })

                reject(res)
              }
            })
          } else {
            resolve(res)
            console.log("用户已经授权")
          }
        },
        fail: reject
      })

    })
  },

  //扫描图片中的数据
  scanImageInfo: function (imageData) {
    var that = this;
    const detectUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${that.data.baiduToken}`;

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });

    return new Promise(function (resolve, reject) {
      wx.request({
        url: detectUrl,
        data: {
          image: imageData
        },
        method: 'POST',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: resolve,
        fail: reject,
        complete: res => {
          //隐藏加载界面
          wx.hideLoading()
        }
      })
    })
  },

  //点击关闭弹窗详细信息
  modal_hidden: function () {
    this.setData({
      isHiddenInfoModal: true,
      isHiddenScanModal: true
    })
  },

  //点击扫描识别的项目
  doClickScanItem: function (event) {
    this.setData({
      isHiddenScanModal: true
    })
    console.log("【选择的物品】", event.currentTarget.dataset.name)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })

    //开始搜索
    this.doClick(null);
  },

  //点击扫描弹窗确定
  scanModal_confirm: function (event) {
    this.setData({
      isHiddenInfoModal: true,
      isHiddenScanModal: true
    })
  }
})