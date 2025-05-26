// pages/fridge/add.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    mode: 'add', // 'add' 新增模式，'edit' 编辑模式
    formData: {
      name: '',
      category: '蔬菜水果',
      amount: '',
      unit: '个',
      purchaseDate: '',
      expiryDate: '',
      location: '冷藏',
      notes: '',
      barcode: ''
    },
    categories: ['蔬菜水果', '肉类', '海鲜', '乳制品', '豆制品', '调味料', '主食', '其他'],
    units: ['个', '斤', '克', '包', '盒', '瓶', '袋', '罐', '块'],
    locations: ['冷藏', '冷冻', '常温'],
    today: '',
    maxDate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置日期范围，日期选择器限制
    const today = new Date();
    const todayStr = this.formatDate(today);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1); // 最大日期为一年后
    
    this.setData({
      today: todayStr,
      'formData.purchaseDate': todayStr,
      maxDate: this.formatDate(maxDate)
    });
    
    // 计算默认过期日期（两周后）
    const defaultExpiryDate = new Date();
    defaultExpiryDate.setDate(defaultExpiryDate.getDate() + 14);
    this.setData({
      'formData.expiryDate': this.formatDate(defaultExpiryDate)
    });
    
    // 判断是新增还是编辑模式
    if (options.id) {
      // 编辑模式
      this.setData({
        id: options.id,
        mode: 'edit'
      });
      wx.setNavigationBarTitle({
        title: '编辑食材'
      });
      this.loadFoodData(options.id);
    } else if (options.barcode) {
      // 扫码添加模式
      this.setData({
        'formData.barcode': options.barcode
      });
      this.tryParseBarcode(options.barcode);
    } else {
      // 普通新增模式
      wx.setNavigationBarTitle({
        title: '添加食材'
      });
    }
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

  },

  // 加载食材数据
  loadFoodData(id) {
    // 在实际应用中应该从服务器获取数据
    // 这里使用模拟数据
    
    // 假设从冰箱页面传来的 id 是数字，对应 fridgeItems 数组的索引
    const fridgeItems = [
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
      }
    ];
    
    // 模拟数据，根据 id 查找对应食材
    const item = fridgeItems.find(item => item.id == id);
    
    if (item) {
      this.setData({
        formData: item
      });
    } else {
      wx.showToast({
        title: '食材不存在',
        icon: 'none'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },
  
  // 尝试解析条形码
  tryParseBarcode(barcode) {
    // 实际应用中，应该调用商品数据库API查询条形码对应的商品信息
    // 这里使用模拟数据
    
    // 假设条形码最后一位可以标识不同商品
    const lastDigit = barcode.charAt(barcode.length - 1);
    let mockItem = null;
    
    if (lastDigit === '1') {
      mockItem = {
        name: '光明牛奶',
        category: '乳制品',
        unit: '盒',
        location: '冷藏'
      };
    } else if (lastDigit === '2') {
      mockItem = {
        name: '五花肉',
        category: '肉类',
        unit: '克',
        location: '冷冻'
      };
    } else if (lastDigit === '3') {
      mockItem = {
        name: '胡萝卜',
        category: '蔬菜水果',
        unit: '个',
        location: '冷藏'
      };
    }
    
    if (mockItem) {
      this.setData({
        'formData.name': mockItem.name,
        'formData.category': mockItem.category,
        'formData.unit': mockItem.unit,
        'formData.location': mockItem.location
      });
      
      wx.showToast({
        title: '识别成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '未找到商品信息',
        icon: 'none'
      });
    }
  },
  
  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 表单项输入事件
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },
  
  // 选择器变更事件
  onPickerChange(e) {
    const field = e.currentTarget.dataset.field;
    const index = e.detail.value;
    let value = '';
    
    switch (field) {
      case 'category':
        value = this.data.categories[index];
        break;
      case 'unit':
        value = this.data.units[index];
        break;
      case 'location':
        value = this.data.locations[index];
        break;
    }
    
    this.setData({
      [`formData.${field}`]: value
    });
  },
  
  // 日期选择器变更事件
  onDateChange(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },
  
  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      'formData.category': category
    });
  },
  
  // 选择存放位置
  selectLocation(e) {
    const location = e.currentTarget.dataset.location;
    this.setData({
      'formData.location': location
    });
  },
  
  // 提交表单
  submitForm() {
    // 表单验证
    if (!this.data.formData.name) {
      wx.showToast({
        title: '请输入食材名称',
        icon: 'none'
      });
      return;
    }
    
    if (!this.data.formData.amount) {
      wx.showToast({
        title: '请输入数量',
        icon: 'none'
      });
      return;
    }
    
    // 提交数据
    // 实际应用中应该调用API保存数据
    wx.showLoading({
      title: '保存中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1000);
  },
  
  // 取消操作
  cancelOperation() {
    wx.navigateBack();
  }
})