const app = getApp()

Page({
  data: {
    fridgeItems: [],
    categories: ['全部', '蔬菜水果', '肉类', '海鲜', '乳制品', '豆制品', '调味料', '主食', '其他'],
    activeCategory: '全部',
    searchValue: '',
    expiringSoon: [],
    showExpiringSoon: true
  },
  
  onLoad: function (options) {
    // 页面初始化
    this.loadFridgeData();
  },
  
  onShow: function () {
    // 页面显示时刷新数据
    this.loadFridgeData();
  },
  
  // 加载冰箱数据
  loadFridgeData: function() {
    // 模拟数据，实际应从服务器获取
    const mockItems = [
      {
        id: 1,
        name: '西红柿',
        category: '蔬菜水果',
        amount: 3,
        unit: '个',
        purchaseDate: '2023-05-15',
        expiryDate: '2023-05-25',
        location: '冷藏',
        notes: '新鲜'
      },
      {
        id: 2,
        name: '鸡蛋',
        category: '其他',
        amount: 10,
        unit: '个',
        purchaseDate: '2023-05-12',
        expiryDate: '2023-05-30',
        location: '冷藏',
        notes: ''
      },
      {
        id: 3,
        name: '猪肉',
        category: '肉类',
        amount: 500,
        unit: '克',
        purchaseDate: '2023-05-16',
        expiryDate: '2023-05-22',
        location: '冷冻',
        notes: '已分小包'
      },
      {
        id: 4,
        name: '牛奶',
        category: '乳制品',
        amount: 1,
        unit: '盒',
        purchaseDate: '2023-05-14',
        expiryDate: '2023-05-21',
        location: '冷藏',
        notes: ''
      },
      {
        id: 5,
        name: '胡萝卜',
        category: '蔬菜水果',
        amount: 2,
        unit: '根',
        purchaseDate: '2023-05-13',
        expiryDate: '2023-05-27',
        location: '冷藏',
        notes: ''
      }
    ];
    
    // 计算即将过期的食材
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    
    const expiringSoon = mockItems.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= threeDaysLater && expiryDate >= today;
    });
    
    this.setData({
      fridgeItems: mockItems,
      expiringSoon: expiringSoon
    });
  },
  
  // 切换分类
  onCategoryTap: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    });
  },
  
  // 搜索
  onSearchInput: function(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },
  
  // 清空搜索
  clearSearch: function() {
    this.setData({
      searchValue: ''
    });
  },
  
  // 切换是否显示即将过期
  toggleExpiringSoon: function() {
    this.setData({
      showExpiringSoon: !this.data.showExpiringSoon
    });
  },
  
  // 添加食材
  addItem: function() {
    wx.navigateTo({
      url: '/pages/fridge/add'
    });
  },
  
  // 扫码添加
  scanToAdd: function() {
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果：', res);
        // 跳转到添加页面并传递扫码结果
        wx.navigateTo({
          url: `/pages/fridge/add?barcode=${res.result}`
        });
      },
      fail: (err) => {
        console.error('扫码失败：', err);
        wx.showToast({
          title: '扫码失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 编辑食材
  editItem: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/fridge/add?id=${id}`
    });
  },
  
  // 删除食材
  deleteItem: function(e) {
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认删除',
      content: '是否确认删除该食材？',
      success: (res) => {
        if (res.confirm) {
          // 模拟删除操作
          const updatedItems = this.data.fridgeItems.filter(item => item.id !== id);
          
          this.setData({
            fridgeItems: updatedItems
          });
          
          // 重新计算即将过期食材
          this.loadFridgeData();
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },
  
  // 获取过滤后的食材
  getFilteredItems: function() {
    let items = this.data.fridgeItems;
    
    // 类别筛选
    if (this.data.activeCategory !== '全部') {
      items = items.filter(item => item.category === this.data.activeCategory);
    }
    
    // 搜索筛选
    if (this.data.searchValue) {
      const keyword = this.data.searchValue.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(keyword) || 
        item.notes.toLowerCase().includes(keyword)
      );
    }
    
    return items;
  }
}) 