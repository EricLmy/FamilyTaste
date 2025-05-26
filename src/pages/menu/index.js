// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKeyword: '',
    currentCategory: 'all', // 当前选中的分类
    currentFilter: 'default', // 当前选中的筛选条件
    dishes: [], // 菜品列表
    allDishes: [], // 所有菜品（用于筛选）
    recommendDishes: [], // 推荐菜品
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '菜单库'
    });
    
    this.fetchDishes();
    this.fetchRecommendDishes();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 更新收藏状态
    this.updateFavoriteStatus();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 获取菜品数据
   */
  fetchDishes() {
    // 显示加载状态
    this.setData({
      isLoading: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      // 模拟菜品数据
      const mockDishes = [
        {
          id: 1,
          name: '番茄炒蛋',
          description: '家常经典菜，酸甜可口，简单易做。',
          image: 'https://images.unsplash.com/photo-1607103058027-4afcd80e1500?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '简单',
          cookingTime: 15,
          rating: 4.8,
          isFavorite: true,
          category: 'hot'
        },
        {
          id: 2,
          name: '糖醋排骨',
          description: '酸甜开胃，肉质鲜嫩，色泽红亮。',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '中等',
          cookingTime: 40,
          rating: 4.6,
          isFavorite: false,
          category: 'hot'
        },
        {
          id: 3,
          name: '红烧肉',
          description: '肥而不腻，色泽红亮，入口即化。',
          image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '中等',
          cookingTime: 60,
          rating: 4.9,
          isFavorite: false,
          category: 'hot'
        },
        {
          id: 4,
          name: '西红柿土豆炖牛腩',
          description: '汤汁浓郁，牛肉软烂，营养丰富。',
          image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '困难',
          cookingTime: 90,
          rating: 4.7,
          isFavorite: false,
          category: 'recent'
        },
        {
          id: 5,
          name: '蒜蓉西兰花',
          description: '翠绿爽口，蒜香四溢，简单易做。',
          image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '简单',
          cookingTime: 10,
          rating: 4.5,
          isFavorite: false,
          category: 'create'
        },
        {
          id: 6,
          name: '水煮肉片',
          description: '麻辣鲜香，肉片鲜嫩，开胃下饭。',
          image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          difficulty: '中等',
          cookingTime: 30,
          rating: 4.7,
          isFavorite: false,
          category: 'hot'
        }
      ];
      
      this.setData({
        dishes: mockDishes,
        allDishes: mockDishes,
        isLoading: false
      });
      
      // 根据当前分类和筛选条件过滤数据
      this.filterDishes();
    }, 500);
  },
  
  /**
   * 获取推荐菜品数据
   */
  fetchRecommendDishes() {
    // 模拟推荐菜品数据
    const recommendDishes = [
      {
        id: 7,
        name: '宫保鸡丁',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        rating: 4.9
      },
      {
        id: 8,
        name: '鱼香肉丝',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        rating: 4.7
      },
      {
        id: 9,
        name: '麻婆豆腐',
        image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        rating: 4.8
      },
      {
        id: 10,
        name: '清蒸鲈鱼',
        image: 'https://images.unsplash.com/photo-1556040220-4096d522e6a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        rating: 4.6
      },
      {
        id: 11,
        name: '小炒肉',
        image: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
        rating: 4.5
      }
    ];
    
    this.setData({
      recommendDishes
    });
  },
  
  /**
   * 根据条件过滤菜品
   */
  filterDishes() {
    let filteredDishes = [...this.data.allDishes];
    
    // 关键词筛选
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filteredDishes = filteredDishes.filter(dish => 
        dish.name.toLowerCase().includes(keyword) || 
        dish.description.toLowerCase().includes(keyword)
      );
    }
    
    // 分类筛选
    if (this.data.currentCategory !== 'all') {
      filteredDishes = filteredDishes.filter(dish => {
        if (this.data.currentCategory === 'favorite') {
          return dish.isFavorite;
        }
        return dish.category === this.data.currentCategory;
      });
    }
    
    // 排序
    if (this.data.currentFilter === 'rating') {
      filteredDishes.sort((a, b) => b.rating - a.rating);
    } else if (this.data.currentFilter === 'difficulty') {
      const difficultyMap = { '简单': 1, '中等': 2, '困难': 3 };
      filteredDishes.sort((a, b) => difficultyMap[a.difficulty] - difficultyMap[b.difficulty]);
    }
    
    this.setData({
      dishes: filteredDishes
    });
  },
  
  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
    this.filterDishes();
  },
  
  /**
   * 清除搜索
   */
  clearSearch() {
    this.setData({
      searchKeyword: ''
    });
    this.filterDishes();
  },
  
  /**
   * 切换分类
   */
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    this.filterDishes();
  },
  
  /**
   * 切换筛选条件
   */
  switchFilter(e) {
    const filter = e.currentTarget.dataset.filter;
    this.setData({
      currentFilter: filter
    });
    this.filterDishes();
  },
  
  /**
   * 切换收藏状态
   */
  toggleFavorite(e) {
    const id = e.currentTarget.dataset.id;
    const index = e.currentTarget.dataset.index;
    
    // 更新当前显示列表中的收藏状态
    const dishes = this.data.dishes;
    dishes[index].isFavorite = !dishes[index].isFavorite;
    
    // 更新原始数据中的收藏状态
    const allDishes = this.data.allDishes;
    const originIndex = allDishes.findIndex(dish => dish.id === id);
    if (originIndex !== -1) {
      allDishes[originIndex].isFavorite = dishes[index].isFavorite;
    }
    
    this.setData({
      dishes,
      allDishes
    });
    
    // 显示提示
    wx.showToast({
      title: dishes[index].isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    });
  },
  
  /**
   * 更新收藏状态
   */
  updateFavoriteStatus() {
    // 实际应用中，应该从本地存储或服务器获取收藏状态
    // 这里仅做示例，不做实际操作
  },
  
  /**
   * 前往菜品详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/menu/detail?id=${id}`
    });
  },
  
  /**
   * 创建新菜品
   */
  createDish() {
    wx.navigateTo({
      url: '/pages/menu/detail?mode=create'
    });
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.fetchDishes();
    this.fetchRecommendDishes();
    wx.stopPullDownRefresh();
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 加载更多菜品
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '家味食记 - 菜单库',
      path: '/pages/menu/index'
    };
  }
})