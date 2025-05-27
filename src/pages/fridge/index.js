const app = getApp()

Page({
  data: {
    categories: [
      {
        name: '蔬菜水果',
        foods: []
      },
      {
        name: '肉类',
        foods: []
      },
      {
        name: '海鲜',
        foods: []
      },
      {
        name: '乳制品',
        foods: []
      },
      {
        name: '调味料',
        foods: []
      },
      {
        name: '其他',
        foods: []
      }
    ],
    showAddModal: false,
    searchValue: ''
  },
  
  onLoad() {
    this.loadFoodList()
  },
  
  onShow() {
    // 页面显示时刷新数据
    this.loadFoodList()
  },
  
  // 加载食材列表
  loadFoodList() {
    // TODO: 调用后端API获取食材列表
    wx.request({
      url: 'YOUR_API_URL/fridge/list',
      success: (res) => {
        // 按类别整理食材数据
        const foodList = res.data || []
        const categories = this.data.categories.map(category => {
          category.foods = foodList.filter(food => food.category === category.name)
          return category
        })
        this.setData({ categories })
      }
    })
  },
  
  // 搜索
  onSearch(e) {
    const searchValue = e.detail.value
    this.setData({ searchValue })
    // TODO: 实现搜索逻辑
  },
  
  // 跳转到扫码页面
  goToScan() {
    wx.navigateTo({
      url: '/pages/fridge/scan/index'
    })
  },
  
  // 显示添加食材弹窗
  showAddModal() {
    this.setData({
      showAddModal: true
    })
  },
  
  // 编辑食材
  editFood(e) {
    const foodId = e.currentTarget.dataset.id
    // TODO: 实现编辑逻辑
  },
  
  // 删除食材
  deleteFood(e) {
    const foodId = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个食材吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 调用后端API删除食材
          wx.request({
            url: `YOUR_API_URL/fridge/delete/${foodId}`,
            method: 'DELETE',
            success: () => {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              this.loadFoodList()
            }
          })
        }
      }
    })
  }
}) 