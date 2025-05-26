// pages/menu/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    dish: null,
    currentTab: 'ingredients', // 当前选中的标签页
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.id) {
      this.setData({
        id: options.id
      });
      this.fetchDishDetail(options.id);
    } else {
      wx.showToast({
        title: '菜品ID不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  /**
   * 获取菜品详情
   */
  fetchDishDetail(id) {
    // 显示加载状态
    this.setData({
      isLoading: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      // 模拟菜品详情数据
      const mockDishDetail = {
        id: parseInt(id),
        name: '番茄炒蛋',
        description: '番茄炒蛋是一道简单而经典的家常菜，酸甜可口，色彩鲜艳，是初学烹饪的入门菜谱。此菜营养丰富，口味大众化，深受各个年龄段人群的喜爱。',
        images: [
          'https://images.unsplash.com/photo-1607103058027-4afcd80e1500?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
        ],
        difficulty: '简单',
        cookingTime: 15,
        rating: 4.8,
        isFavorite: true,
        tags: ['家常菜', '快手菜', '营养丰富', '素菜', '下饭菜'],
        ingredients: [
          { name: '番茄', amount: '2', unit: '个' },
          { name: '鸡蛋', amount: '3-4', unit: '个' },
          { name: '食用油', amount: '2', unit: '勺' },
          { name: '盐', amount: '适量', unit: '' },
          { name: '白糖', amount: '1/2', unit: '勺' },
          { name: '葱花', amount: '少许', unit: '' }
        ],
        cookingSteps: [
          {
            stepNumber: 1,
            description: '准备食材：将番茄洗净切块，鸡蛋打散加少许盐搅拌均匀。',
            image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            timeInMinutes: 3
          },
          {
            stepNumber: 2,
            description: '热锅冷油，倒入打散的鸡蛋，迅速翻炒至金黄色，盛出备用。',
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            timeInMinutes: 2
          },
          {
            stepNumber: 3,
            description: '锅中留底油，放入番茄翻炒，加入少许盐和白糖炒出汁。',
            image: 'https://images.unsplash.com/photo-1564759298141-cba1a71a7cdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            timeInMinutes: 5
          },
          {
            stepNumber: 4,
            description: '倒入炒好的鸡蛋，迅速翻炒均匀，使番茄汁和鸡蛋充分混合。',
            image: 'https://images.unsplash.com/photo-1572114692956-e144bd652292?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            timeInMinutes: 2
          },
          {
            stepNumber: 5,
            description: '撒上葱花，出锅装盘即可。',
            image: 'https://images.unsplash.com/photo-1607103058027-4afcd80e1500?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            timeInMinutes: 1
          }
        ],
        nutritionFacts: {
          calories: 120,
          protein: 8.5,
          fat: 6.2,
          carbs: 9.3,
          fiber: 1.5,
          sugar: 7.2,
          sodium: 380
        },
        videoUrl: 'https://example.com/video/tomato-egg.mp4',
        source: '家庭厨房',
        creatorId: 1001
      };
      
      this.setData({
        dish: mockDishDetail,
        isLoading: false
      });
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: mockDishDetail.name
      });
    }, 800);
  },
  
  /**
   * 切换标签页
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  },
  
  /**
   * 切换收藏状态
   */
  toggleFavorite() {
    const newStatus = !this.data.dish.isFavorite;
    
    this.setData({
      'dish.isFavorite': newStatus
    });
    
    // 提示用户
    wx.showToast({
      title: newStatus ? '已收藏' : '已取消收藏',
      icon: 'success',
      duration: 1500
    });
    
    // 实际应用中应该将收藏状态同步到服务器
    // 这里简化处理，只更新本地状态
  },
  
  /**
   * 添加到菜单
   */
  addToMenu() {
    wx.showActionSheet({
      itemList: ['添加到今日菜单', '添加到明日菜单', '添加到自定义菜单'],
      success: (res) => {
        if (!res.cancel) {
          const index = res.tapIndex;
          
          // 模拟添加成功
          setTimeout(() => {
            wx.showToast({
              title: '添加成功',
              icon: 'success'
            });
          }, 500);
        }
      }
    });
  },
  
  /**
   * 开始烹饪
   */
  startCooking() {
    // 在实际应用中，可能会跳转到烹饪引导页或视频播放页面
    // 这里简化处理，只显示提示
    
    wx.showModal({
      title: '开始烹饪',
      content: '是否进入烹饪模式？烹饪模式将逐步引导您完成菜品制作。',
      confirmText: '进入',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '功能开发中',
            icon: 'none'
          });
        }
      }
    });
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    if (this.data.dish) {
      return {
        title: `【菜谱分享】${this.data.dish.name}`,
        path: `/pages/menu/detail?id=${this.data.id}`,
        imageUrl: this.data.dish.images[0]
      };
    }
    return {
      title: '家味食记 - 菜谱分享',
      path: '/pages/menu/index'
    };
  }
})