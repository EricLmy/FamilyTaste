// index.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    todayMenu: null,
    today: '',
    menuList: [
      { breakfast: [], lunch: [], dinner: [] }
    ],
    entrances: [
      {
        id: 'today-plan',
        name: '今日计划',
        icon: '../../images/today_plan.png',
        url: '/pages/menu/plan?type=day'
      },
      {
        id: 'week-plan',
        name: '一周计划',
        icon: '../../images/week_plan.png',
        url: '/pages/menu/plan?type=week'
      },
      {
        id: 'wheel',
        name: '转盘选菜',
        icon: '../../images/wheel.png',
        url: '/pages/wheel/index'
      },
      {
        id: 'menu-lib',
        name: '菜单库',
        icon: '../../images/menu_lib.png',
        url: '/pages/menu/index'
      }
    ]
  },
  
  onLoad: function () {
    this.setTodayDate();
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
    // 获取今日菜单
    this.getTodayMenu();
  },
  
  onShow: function() {
    // 每次页面显示时重新获取今日菜单，以保证数据最新
    this.getTodayMenu();
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  // 设置今天的日期
  setTodayDate: function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    this.setData({
      today: `${year}年${month}月${day}日`
    });
  },
  
  // 获取今日菜单
  getTodayMenu: function() {
    // 这里应该是从服务器获取数据，现在先用模拟数据
    const mockTodayMenu = {
      breakfast: [
        { id: 1, name: '牛奶麦片', image: '../../images/meal_default.png' },
        { id: 2, name: '煎鸡蛋', image: '../../images/meal_default.png' }
      ],
      lunch: [
        { id: 3, name: '红烧排骨', image: '../../images/meal_default.png' },
        { id: 4, name: '青菜炒豆腐', image: '../../images/meal_default.png' },
        { id: 5, name: '番茄蛋汤', image: '../../images/meal_default.png' }
      ],
      dinner: [
        { id: 6, name: '清蒸鲈鱼', image: '../../images/meal_default.png' },
        { id: 7, name: '香菇油菜', image: '../../images/meal_default.png' },
        { id: 8, name: '紫菜蛋花汤', image: '../../images/meal_default.png' }
      ]
    };
    
    this.setData({
      todayMenu: mockTodayMenu
    });
  },
  
  // 点击功能入口
  onEntranceTap: function(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  
  // 点击菜品
  onDishTap: function(e) {
    const dishId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/menu/detail?id=${dishId}`
    });
  }
}) 