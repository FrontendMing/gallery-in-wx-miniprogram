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
    // 存储定时器返回值（Number），清除定时器时用
    timer1: null,
    timer2: null,
    timer3: null,
    // 动画列表数据
    animationData1: null,
    animationData2: null,
    animationData3: null,
    leftStart: 0, // 左移列表初始偏移值
    rightStart: 0, // 右移列表初始偏移值

    // 以下为自定义参数
    imgWidth: 120, // 图片宽度
    imgGap: 10, // 图片间隙
    listGap: 10, // 列表之间的间隙
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
    let [imgW, gap, len, rotate] 
      = [this.data.imgWidth, this.data.imgGap, this.data.list.length, this.data.rotate]
    
    // 根据列表旋转角度，计算列表之间的间隙
    let listGap = Math.floor((imgW + this.data.listGap) / Math.cos(Math.PI * rotate / 180)) - imgW
    
    this.setData({
      leftStart: -(imgW + gap),
      rightStart: this.data.windowWidth - (imgW + gap) * (len / 3) * 2 - (imgW + gap),
      listGap: listGap,
      list: this.data.list
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 默认参数
    let defOpts = {
      imgW: this.data.imgWidth,
      gap: this.data.imgGap,
      len: this.data.list.length / 3,
      rotate: this.data.rotate,
      duration: this.data.duration
    }

    let options1 = { // 列表一
      start: this.data.leftStart,
      direction: 'left',
      target: 'animationData1',
      ...defOpts
    }
    let options2 = { // 列表二
      start: this.data.rightStart,
      direction: 'right',
      target: 'animationData2',
      ...defOpts
    }
    let options3 = { // 列表三
      start: this.data.leftStart,
      direction: 'left',
      target: 'animationData3',
      ...defOpts
    }

    this.data.timer1 = this.createAnimations(options1)
    this.data.timer2 = this.createAnimations(options2)
    this.data.timer3 = this.createAnimations(options3)
  },

  /**
   * 创建动画函数
   * @params: start 列表偏移初始值
   * @params: direction 动画方向
   * @params: target 动画对象赋值
   * @params: imgW 图片宽度
   * @params: gap 图片间隙
   * @params: len 未拷贝前数组的长度，即原始数组长度
   * @params: rotate 列表旋转角度
   * @params: duration 动画持续时间
   */
  createAnimations(opts) {

    let [ start, direction, target, imgW, gap, len, rotate, duration ]
      = [ opts.start, opts.direction, opts.target, 
          opts.imgW, opts.gap, opts.len, opts.rotate, opts.duration ]

    let animation = wx.createAnimation({
      timingFunction: 'linear',
    })

    let [n, moveWidth] = [start, (imgW + gap) * len]

    let timer = setInterval(() => {
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

    return timer // 页面隐藏或卸载时 清除定时器用
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer1)
    clearInterval(this.data.timer2)
    clearInterval(this.data.timer3)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer1)
    clearInterval(this.data.timer2)
    clearInterval(this.data.timer3)
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