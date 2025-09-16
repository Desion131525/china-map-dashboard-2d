# 中国2D地图数据看板

基于ECharts构建的中国地图数据可视化看板，提供实时数据展示和分析功能。

## 功能特性

- 🗺️ 中国地图数据可视化
- 📊 实时数据指标展示
- 📈 趋势分析和分布图表
- 📱 响应式设计，支持移动端
- 🔄 自动数据更新

## 技术栈

- **前端框架**: 原生HTML/CSS/JavaScript
- **可视化库**: ECharts 5.4.3
- **开发服务器**: http-server
- **兼容性**: 现代浏览器（Chrome, Firefox, Safari, Edge）

## 项目结构

```
china-map-dashboard-2d/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── app.js          # 主应用逻辑
│   └── map.js          # 地图可视化逻辑
├── data/               # 数据文件目录
├── assets/             # 静态资源目录
├── package.json        # 项目配置
└── PROJECT_README.md   # 项目说明
```

## 快速开始

### 环境要求

- Node.js 14.0.0 或更高版本
- 现代网页浏览器

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
# 使用 http-server (推荐)
npm start
# 或
npm run dev

# 使用 Python 内置服务器
npm run serve
```

服务器启动后，在浏览器中访问 `http://localhost:8080`（或相应端口）。

### 直接打开

也可以直接双击 `index.html` 文件在浏览器中打开。

## 开发指南

### 添加新图表

1. 在 `index.html` 中添加图表容器
2. 在 `js/app.js` 中初始化图表
3. 在 `css/style.css` 中添加样式

### 数据集成

- 将数据文件放入 `data/` 目录
- 在 JavaScript 中使用 `fetch()` 加载数据
- 使用 ECharts 的 `setOption()` 更新图表

### 自定义样式

所有样式定义在 `css/style.css` 中，使用 CSS 变量便于主题定制：

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2c3e50;
    --background-color: #f5f7fa;
}
```

## ECharts 配置

本项目使用 ECharts 5.4.3，通过 CDN 引入。主要配置包括：

- 地图散点图显示数据分布
- 折线图显示趋势数据
- 饼图显示区域分布
- 响应式布局和交互功能

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 开发计划

- [ ] 集成真实的中国地理JSON数据
- [ ] 添加省份边界显示
- [ ] 实现数据筛选和过滤
- [ ] 添加导出功能（PNG/PDF）
- [ ] 支持主题切换（深色/浅色模式）
- [ ] 添加实时数据接口

## 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 技术支持

如有问题请提交 [Issue](https://github.com/Desion131525/china-map-dashboard-2d/issues)。

---

由 Claude Code 驱动开发