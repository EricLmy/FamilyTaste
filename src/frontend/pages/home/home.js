Page({
  data: {
    todayDate: '',
    weekDay: '',
    breakfastList: [
      { name: '鸡蛋三明治', image: '/images/3.jpg', calories: '320kcal', protein: '12g', ingredients: '鸡蛋、面包、火腿', steps: '1.煎蛋2.夹面包3.加火腿' },
      { name: '牛奶', image: '/images/3.jpg', calories: '60kcal', protein: '3g', ingredients: '牛奶', steps: '1.加热2.饮用' },
      { name: '小米粥', image: '/images/3.jpg', calories: '80kcal', protein: '2g', ingredients: '小米、水', steps: '1.煮粥' },
      { name: '煎饼果子', image: '/images/3.jpg', calories: '350kcal', protein: '8g', ingredients: '面粉、鸡蛋、油条', steps: '1.摊饼2.加蛋3.卷油条' },
      { name: '豆浆', image: '/images/3.jpg', calories: '90kcal', protein: '4g', ingredients: '黄豆、水', steps: '1.泡豆2.打浆3.煮沸' },
      { name: '包子', image: '/images/3.jpg', calories: '180kcal', protein: '6g', ingredients: '面粉、猪肉、酵母', steps: '1.和面2.包馅3.蒸制' },
      { name: '油条', image: '/images/3.jpg', calories: '220kcal', protein: '3g', ingredients: '面粉、油', steps: '1.和面2.炸制' }
    ],
    lunchList: [
      { name: '番茄牛腩饭', image: '/images/3.jpg', calories: '480kcal', protein: '20g', ingredients: '番茄、牛腩、米饭', steps: '1.炖牛腩2.加番茄3.配米饭' },
      { name: '炒青菜', image: '/images/3.jpg', calories: '90kcal', protein: '2g', ingredients: '青菜、蒜', steps: '1.热锅2.炒菜3.加蒜' }
    ],
    dinnerList: [
      { name: '清蒸鲈鱼', image: '/images/3.jpg', calories: '220kcal', protein: '25g', ingredients: '鲈鱼、姜葱', steps: '1.处理鱼2.蒸鱼3.加葱姜' },
      { name: '紫菜蛋花汤', image: '/images/3.jpg', calories: '60kcal', protein: '4g', ingredients: '紫菜、鸡蛋', steps: '1.煮水2.加紫菜3.打蛋花' }
    ],
    showDetail: false,
    currentDish: {}
  },
  onLoad() {
    const now = new Date();
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, '0');
    const d = now.getDate().toString().padStart(2, '0');
    const weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    const weekDay = weekArr[now.getDay()];
    this.setData({ todayDate: `${y}-${m}-${d}`, weekDay });
  },
  showDishDetail(e) {
    const dish = e.currentTarget.dataset.dish;
    this.setData({ showDetail: true, currentDish: dish });
  },
  closeDishDetail() {
    this.setData({ showDetail: false, currentDish: {} });
  },
  goTodayPlan() {
    wx.navigateTo({ url: '/pages/menu/menu' });
  },
  goWeekPlan() {
    wx.navigateTo({ url: '/pages/menu/menu?type=week' });
  },
  goRoulette() {
    wx.navigateTo({ url: '/pages/roulette/roulette' });
  },
  goDishLib() {
    wx.navigateTo({ url: '/pages/dish/dish_list' });
  }
}) 