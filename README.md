# 贷款计算器

一个基于Vue 3 + TypeScript + Element Plus的贷款计算器Web应用。

## 功能特性

- 🏦 **贷款计算** - 支持等额本息和等额本金两种还款方式
- 💰 **提前还款计算** - 计算提前还款的节省利息和月供变化
- 📊 **方案对比** - 对比不同贷款方案的成本和收益
- 📱 **响应式设计** - 适配桌面端和移动端
- 🎨 **现代化UI** - 使用Element Plus组件库

## 技术栈

- Vue 3 - 渐进式JavaScript框架
- TypeScript - 类型安全的JavaScript
- Element Plus - Vue 3组件库
- Vite - 现代化的构建工具

## 安装和运行

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 生产构建

```bash
npm run build
```

构建后的文件将在 `dist` 目录中。

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 通用组件
├── views/              # 页面组件
│   ├── LoanCalculator.vue    # 贷款计算页面
│   ├── EarlyRepayment.vue    # 提前还款计算页面
│   └── Comparison.vue        # 方案对比页面
├── router/             # 路由配置
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
│   └── loanCalculator.ts     # 贷款计算核心逻辑
├── App.vue             # 根组件
└── main.ts             # 应用入口
```

## 使用说明

### 贷款计算

1. 输入贷款金额、年利率、贷款年限
2. 选择还款方式（等额本息或等额本金）
3. 点击"计算"按钮查看结果
4. 支持查看详细的还款计划和图表分析

### 提前还款计算

1. 输入原贷款信息
2. 设置提前还款期数和金额
3. 选择还款类型（缩短年限或减少月供）
4. 查看提前还款前后的对比分析

### 方案对比

1. 输入两个不同的贷款方案
2. 点击"对比方案"查看详细对比
3. 支持方案交换和重置功能
4. 提供推荐建议和详细分析

## 计算公式

### 等额本息

月供 = 贷款本金 × [月利率 × (1 + 月利率)^还款月数] / [(1 + 月利率)^还款月数 - 1]

### 等额本金

月供 = 贷款本金 / 还款月数 + (贷款本金 - 已归还本金) × 月利率

## 贡献指南

1. Fork 本项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

本项目使用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持贷款计算、提前还款计算和方案对比
- 响应式设计和现代化UI 