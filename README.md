# 家味食记 - Family Taste

一款专注于家庭饮食管理的微信小程序，帮助用户记录、规划日常饮食，支持特殊饮食需求，提供丰富的菜品库，并具备转盘选菜、菜单分享、冰箱管理等功能。

## 项目结构

```
src/
├── app.js               # 小程序全局逻辑
├── app.json             # 小程序全局配置
├── app.wxss             # 小程序全局样式
├── sitemap.json         # 小程序索引配置
├── project.config.json  # 项目配置文件
├── images/              # 图片资源目录
└── pages/               # 页面目录
    ├── index/           # 主页
    ├── fridge/          # 冰箱管理
    ├── personal/        # 个人中心
    ├── menu/            # 菜单库相关
    └── wheel/           # 转盘选菜
```

## 开发说明

1. 使用微信开发者工具打开项目
2. 项目配置在 `project.config.json` 中
3. 在开发前请确保已安装所有必要的依赖

## 功能模块

- **主页**：显示今日菜单，提供功能入口
- **冰箱管理**：记录和管理冰箱内食材
- **菜单规划**：制定日计划和周计划
- **转盘选菜**：随机选择菜品
- **菜单库**：浏览和搜索菜品
- **个人中心**：用户信息和设置

## 开发指南

1. 页面开发遵循小程序的MVVM模式
2. 样式使用`app.wxss`中的公共样式类
3. 图片资源放在`images`目录下
4. 组件复用放在`components`目录下

## 运行环境

- 微信开发者工具 stable 版本
- 微信基础库 2.19.4 及以上

## 注意事项

- 图片资源均为占位图，实际开发需替换为正式图片资源
- 数据为模拟数据，实际开发需接入后端API

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request