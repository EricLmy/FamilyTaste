// 扫码录入页面
Page({
  data: {
    scanResult: null,
    foodInfo: null,
    loading: false
  },

  onLoad() {
    // 页面加载时自动启动扫码
    this.startScan()
  },

  // 启动扫码
  startScan() {
    this.setData({ loading: true })
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        this.setData({
          scanResult: res.result,
          loading: false
        })
        // 获取食材信息
        this.getFoodInfo(res.result)
      },
      fail: (err) => {
        this.setData({ loading: false })
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        })
      }
    })
  },

  // 获取食材信息
  getFoodInfo(barcode) {
    // TODO: 调用后端API获取食材信息
    wx.request({
      url: 'YOUR_API_URL/food/info',
      data: { barcode },
      success: (res) => {
        this.setData({
          foodInfo: res.data
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取食材信息失败',
          icon: 'none'
        })
      }
    })
  },

  // 重新扫码
  reScan() {
    this.startScan()
  },

  // 确认添加
  confirmAdd() {
    const { foodInfo } = this.data
    if (!foodInfo) return
    
    // TODO: 调用后端API保存食材信息
    wx.request({
      url: 'YOUR_API_URL/fridge/add',
      method: 'POST',
      data: foodInfo,
      success: () => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        // 返回冰箱页面
        wx.navigateBack()
      },
      fail: () => {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      }
    })
  }
}) 