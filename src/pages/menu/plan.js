// pages/menu/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedDate: '', // 选中的日期 YYYY-MM-DD
    formattedDate: '', // 显示的日期文字
    today: '', // 今天的日期
    maxDate: '', // 最大可选日期
    selectedTab: 'day', // 'day'日计划, 'week'周计划
    currentWeekDay: 0, // 当前选中的星期几（0-6，0表示周一）
    dayPlan: {
      breakfast: [],
      lunch: [],
      dinner: []
    },
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置当前日期和最大日期限制
    const today = new Date();
    const todayStr = this.formatDate(today);
    
    // 设置最大可选日期为3个月后
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    
    this.setData({
      selectedDate: todayStr,
      today: todayStr,
      maxDate: this.formatDate(maxDate)
    });
    
    // 更新格式化显示的日期
    this.updateFormattedDate(today);
    
    wx.setNavigationBarTitle({
      title: '菜单计划'
    });
    
    // 加载当日菜单数据
    this.loadDayPlan(todayStr);
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
    // 可能从菜品选择页面返回，需要刷新数据
    if (this.data.selectedDate) {
      this.loadDayPlan(this.data.selectedDate);
    }
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

  },

  /**
   * 格式化日期为 YYYY-MM-DD
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  /**
   * 更新格式化显示的日期
   */
  updateFormattedDate(date) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[date.getDay()];
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const today = new Date();
    let datePrefix = '';
    
    if (this.formatDate(today) === this.formatDate(date)) {
      datePrefix = '今天';
    } else {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (this.formatDate(tomorrow) === this.formatDate(date)) {
        datePrefix = '明天';
      }
    }
    
    const formattedDate = datePrefix ? 
      `${datePrefix}（${month}月${day}日 ${weekDay}）` : 
      `${year}年${month}月${day}日 ${weekDay}`;
    
    this.setData({
      formattedDate
    });
  },
  
  /**
   * 日期选择器变化事件
   */
  onDateChange(e) {
    const dateStr = e.detail.value;
    const date = new Date(dateStr);
    
    this.setData({
      selectedDate: dateStr
    });
    
    this.updateFormattedDate(date);
    this.loadDayPlan(dateStr);
  },
  
  /**
   * 切换日计划/周计划
   */
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      selectedTab: tab
    });
    
    // 如果切换到周计划，加载周数据
    if (tab === 'week') {
      // 加载周数据的逻辑
    }
  },
  
  /**
   * 切换周计划的日期
   */
  switchWeekDay(e) {
    const day = parseInt(e.currentTarget.dataset.day);
    this.setData({
      currentWeekDay: day
    });
    
    // 加载选中日的周计划
  },
  
  /**
   * 加载日计划数据
   */
  loadDayPlan(dateStr) {
    // 显示加载中
    this.setData({
      isLoading: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      // 模拟返回的菜单数据
      // 正常情况下应该根据日期从服务器获取数据
      const mockDayPlan = {
        breakfast: [
          {
            id: 101,
            name: '牛奶麦片',
            image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            portions: 2
          }
        ],
        lunch: [
          {
            id: 1,
            name: '番茄炒蛋',
            image: 'https://images.unsplash.com/photo-1607103058027-4afcd80e1500?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            portions: 1
          },
          {
            id: 5,
            name: '蒜蓉西兰花',
            image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            portions: 1
          }
        ],
        dinner: []
      };
      
      this.setData({
        dayPlan: mockDayPlan,
        isLoading: false
      });
    }, 500);
  },
  
  /**
   * 添加菜品
   */
  addDish(e) {
    const meal = e.currentTarget.dataset.meal;
    wx.navigateTo({
      url: `/pages/menu/select?date=${this.data.selectedDate}&meal=${meal}`
    });
  },
  
  /**
   * 添加周计划菜品
   */
  addWeekDish(e) {
    const meal = e.currentTarget.dataset.meal;
    const day = e.currentTarget.dataset.day;
    wx.showToast({
      title: '周计划功能开发中',
      icon: 'none'
    });
  },
  
  /**
   * 编辑菜品
   */
  editDish(e) {
    const meal = e.currentTarget.dataset.meal;
    const index = e.currentTarget.dataset.index;
    const dish = this.data.dayPlan[meal][index];
    
    wx.showActionSheet({
      itemList: ['修改份数', '删除菜品'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 修改份数
          this.editPortion(meal, index);
        } else if (res.tapIndex === 1) {
          // 删除菜品
          this.deleteDish(e);
        }
      }
    });
  },
  
  /**
   * 编辑菜品份数
   */
  editPortion(meal, index) {
    const dish = this.data.dayPlan[meal][index];
    
    wx.showModal({
      title: '修改份数',
      content: '请输入份数',
      editable: true,
      placeholderText: dish.portions.toString(),
      success: (res) => {
        if (res.confirm) {
          const portions = parseInt(res.content);
          
          if (isNaN(portions) || portions <= 0) {
            wx.showToast({
              title: '请输入有效份数',
              icon: 'none'
            });
            return;
          }
          
          // 更新份数
          const dayPlan = this.data.dayPlan;
          dayPlan[meal][index].portions = portions;
          
          this.setData({
            dayPlan
          });
          
          wx.showToast({
            title: '份数已更新',
            icon: 'success'
          });
          
          // 实际应用中应该同步到服务器
        }
      }
    });
  },
  
  /**
   * 删除菜品
   */
  deleteDish(e) {
    const meal = e.currentTarget.dataset.meal;
    const index = e.currentTarget.dataset.index;
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个菜品吗？',
      success: (res) => {
        if (res.confirm) {
          // 删除菜品
          const dayPlan = this.data.dayPlan;
          dayPlan[meal].splice(index, 1);
          
          this.setData({
            dayPlan
          });
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          
          // 实际应用中应该同步到服务器
        }
      }
    });
  },
  
  /**
   * 生成购物清单
   */
  generateShoppingList() {
    // 检查是否有菜品
    const dayPlan = this.data.dayPlan;
    const hasDishes = dayPlan.breakfast.length > 0 || 
                       dayPlan.lunch.length > 0 || 
                       dayPlan.dinner.length > 0;
    
    if (!hasDishes) {
      wx.showToast({
        title: '请先添加菜品',
        icon: 'none'
      });
      return;
    }
    
    // 实际应用中应该根据菜品提取所需食材生成购物清单
    wx.showLoading({
      title: '生成中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '购物清单已生成',
        icon: 'success'
      });
      
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/shopping/list?from=menu&date=' + this.data.selectedDate
        });
      }, 1500);
    }, 1000);
  },
  
  /**
   * 保存为模板
   */
  saveAsTemplate() {
    // 检查是否有菜品
    const dayPlan = this.data.dayPlan;
    const hasDishes = dayPlan.breakfast.length > 0 || 
                       dayPlan.lunch.length > 0 || 
                       dayPlan.dinner.length > 0;
    
    if (!hasDishes) {
      wx.showToast({
        title: '请先添加菜品',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '保存为模板',
      content: '请输入模板名称',
      editable: true,
      placeholderText: this.data.formattedDate + '菜单',
      success: (res) => {
        if (res.confirm) {
          const templateName = res.content || (this.data.formattedDate + '菜单');
          
          wx.showLoading({
            title: '保存中...'
          });
          
          setTimeout(() => {
            wx.hideLoading();
            
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            });
          }, 1000);
        }
      }
    });
  }
})