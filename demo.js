// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth, // 设备屏幕宽度
    // 图片列表自定义
    list: [
      '../../images/blur_5@2x.png',
      '../../images/main_banner.jpg',
      '../../images/6159252dd42a2834e6d976e257b5c9ea14cebfd8.jpg',
      '../../images/2018112716074070.jpg',
      '../../images/haijing.jpg'
    ],
    animationData1: null,
    animationData2: null,
    animationData3: null,
    listGap: 0, // 列表之间的间隙
    leftStart: 0, // 左移列表初始偏移值
    rightStart: 0, // 右移列表初始偏移值

    // 以下为自定义参数
    imgWidth: 120, // 图片宽度（目前只适配宽高相等的图片）
    imgGap: 10, // 图片间隙
    rotate: 45, // 列表旋转角度
    duration: 100, // 动画持续时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 拷贝数组列表
    this.data.list = [...this.data.list, ...this.data.list, ...this.data.list]
    // 解构赋值
    let [imgW, gap, len] = [this.data.imgWidth, this.data.imgGap, this.data.list.length]
    
    this.setData({
      leftStart: -(imgW + gap),
      rightStart: this.data.windowWidth - (imgW + gap) * (len / 3) * 2 - (imgW + gap),
      listGap: (imgW + gap) / 2,
      list: this.data.list
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let [imgW, gap, len, rotate, duration] = 
        [this.data.imgWidth, this.data.imgGap, this.data.list.length / 3, this.data.rotate, this.data.duration]
    this.createAnimations(imgW, gap, len, 0, 'animationData1', 'left', rotate, duration)
    this.createAnimations(imgW, gap, len, this.data.rightStart, 'animationData2', 'right', rotate, duration)
    this.createAnimations(imgW, gap, len, this.data.leftStart, 'animationData3', 'left', rotate, duration)
  },

  /**
   * imgW: 图片宽度
   * gap: 图片间隙
   * len: 未拷贝前数组的长度，即原始数组长度
   * start: 列表偏移初始值
   * target: 动画对象赋值
   * direction: 动画方向
   */
  createAnimations(imgW, gap, len, start, target, direction, rotate, duration) {
    let animation = wx.createAnimation({
      timingFunction: 'linear',
    })
    let [n, moveWidth]= [start, (imgW + gap) * len]
    setInterval(() => {
      if (direction == 'left'){ // 动画向左移
        n = n - 1
        if (n < start - moveWidth) {
          n = start
          animation.rotate(rotate).translateX(n).step({ duration: 0 })
        } else {
          animation.rotate(rotate).translateX(n).step({ duration: duration })
        }
      }else{ // 动画向右移
        n = n + 1
        if (n > start + moveWidth) {
          n = start
          animation.rotate(rotate).translateX(n).step({ duration: 0 })
        } else {
          animation.rotate(rotate).translateX(n).step({ duration: duration })
        }
      }
      this.setData({
        [target]: animation.export()
      })
    }, duration)
  },

  // 图片点击事件
  tap(){
    debugger
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})