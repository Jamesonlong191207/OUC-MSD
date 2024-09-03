// pages/game/game.js
var data=require('../../utils/data.js');

//地图图层数据
var map =[
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  ]
  //箱子图层数据
  var box =[
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
  ]
  var w=40
  
  var row=0
  var col=0
  
Page({

  data: {
    level:1,
    time : 120,

  }, 
  code_data:
  {
    status : false
  },

  handleCountdownComplete() {
    console.log('倒计时结束，执行game.js中的函数');
    this.code_data.status = false;
    this.restartGame();
  },
  onLoad:function(options) {
    let level=options.level
    this.setData({
      level:parseInt(level)+1
    })
    this.ctx=wx.createCanvasContext('myCanvas')

    this.initMap(level)

    this.drawCanvas()
  },

  initMap:function(level){
    let mapData=data.maps[level]

    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        box[i][j]=0
        map[i][j]=mapData[i][j]

        if(mapData[i][j]==4){
          box[i][j]=4
          map[i][j]=2
        }else if(mapData[i][j]==5){
          map[i][j]=2
          row=i
          col=j
        }
      }
    }
  },

  drawCanvas:function(){
    let ctx=this.ctx
    ctx.clearRect(0,0,320,320)

    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        let img='ice'
        if(map[i][j]==1){
          img='stone'
        }else if(map[i][j]==3){
          img='pig'
        }

        ctx.drawImage('/images/icons/'+img+'.png',j*w,i*w,w,w)

        if(box[i][j]==4){
          ctx.drawImage('/images/icons/box.png',j*w,i*w,w,w)
        }
      }
    }
    ctx.drawImage('/images/icons/bird.png',col*w,row*w,w,w)

    ctx.draw()
  },

  up:function(){
    if(row>0){
      if(map[row-1][col]!=1&&box[row-1][col]!=4){
        row=row-1
      }
      else if(box[row-1][col]==4){
        if(row-1>0){
          if(map[row-2][col]!=1&&box[row-2][col]!=4){
            box[row-2][col]=4
            box[row-1][col]=0
            row=row-1
          }
        }
      }
      this.drawCanvas()
      this.checkWin()
    }
  },

  down:function(){
    if(row<7){
      if(map[row+1][col]!=1&&box[row+1][col]!=4){
        row=row+1
      }
      else if(box[row+1][col]==4){
        if(row+1<7){
          if(map[row+2][col]!=1&&box[row+2][col]!=4){
            box[row+2][col]=4
            box[row+1][col]=0
            row=row+1
          }
        }
      }
      this.drawCanvas()
      this.checkWin()
    }
  },

  left:function(){
    if(col>0){
      if(map[row][col-1]!=1&&box[row][col-1]!=4){
        col=col-1
      }
      else if(box[row][col-1]==4){
        if(col-1>0){
          if(map[row][col-2]!=1&&box[row][col-2]!=4){
            box[row][col-2]=4
            box[row][col-1]=0
            col=col-1
          }
        }
      }
      this.drawCanvas()
      this.checkWin()
    }
  },

  right:function(){
    if(col<7){
      if(map[row][col+1]!=1&&box[row][col+1]!=4){
        col=col+1
      }
      else if(box[row][col+1]==4){
        if(col+1<7){
          if(map[row][col+2]!=1&&box[row][col+2]!=4){
            box[row][col+2]=4
            box[row][col+1]=0
            col=col+1
          }
        }
      }
      this.drawCanvas()
      this.checkWin()
    }
  },

  isWin:function(){
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        if(box[i][j]==4&&map[i][j]!=3){
          return false
        }
      }
    }
    return true
  },

  checkWin:function(){
    if(this.isWin()){
      this.code_data.status = true;
    }
  },

  restartGame:function(){
    if(!this.code_data.status)
    {
      wx.showModal({
        title: '提示',
        content: '是否要增加时间',
        complete: (res) => {
          if (res.cancel) {
            wx.showToast({
              title: '游戏结束',
              icon:'error',
              duration:900
            })
          }
          if (res.confirm) {
            let t = this.data.time + 30;
            this.setData({time:t});
          }
        }
      })
    }
    else
    {
      this.code_data.status = false;
      wx.showModal({
        title:"提示",
        content:'游戏成功！是否缩短时间重新挑战',
        success (res) {
          if (res.confirm) {
            let t = this.data.time - 30;
            if(t < 10)
             wx.showToast({
               title: '时间已经达到最小值',
               icon : 'error',
               duration : 900
             })
             else 
             {
              this.setData({time : t});
             }
          }
        }
      })
    }
    this.initMap(this.data.level-1)
    this.drawCanvas()
  },




})