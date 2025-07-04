# GitHub Pages 部署指南

本指南将帮助您将贷款计算器项目部署到GitHub Pages。

## 🚀 自动部署设置

项目已经配置了GitHub Actions自动部署，当您将代码推送到`master`分支时会自动触发部署。

### 第一次部署步骤：

1. **启用GitHub Pages**
   - 访问您的GitHub仓库：https://github.com/wukaixian/LoanPro
   - 点击 `Settings` → `Pages`
   - 在 "Source" 下选择 `GitHub Actions`

2. **推送代码到master分支**
   ```bash
   # 如果您当前在其他分支，切换到master分支
   git checkout master
   
   # 合并当前更改到master分支
   git merge cursor/deploy-web-project-on-github-f2b0
   
   # 推送到GitHub
   git push origin master
   ```

3. **查看部署状态**
   - 在GitHub仓库页面点击 `Actions` 选项卡
   - 查看 "部署到 GitHub Pages" 工作流的运行状态
   - 部署完成后，您的网站将可在以下地址访问：
     **https://wukaixian.github.io/LoanPro/**

## 📁 项目配置说明

### GitHub Actions 工作流 (`.github/workflows/deploy.yml`)

自动化部署流程包括：
- ✅ 代码检出
- ✅ Node.js 环境设置
- ✅ 依赖安装
- ✅ 项目构建
- ✅ 部署到GitHub Pages

### Vite 配置修改 (`vite.config.ts`)

- 添加了 `base: '/LoanPro/'` 配置，确保资源路径正确
- 仅在生产环境下应用，本地开发不受影响

## 🔧 本地测试部署

在推送到GitHub之前，建议先在本地测试构建：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 📋 部署检查清单

- [ ] GitHub仓库已设置为public（GitHub Pages免费版要求）
- [ ] GitHub Pages已在仓库设置中启用
- [ ] Source已设置为"GitHub Actions"
- [ ] 代码已推送到master分支
- [ ] GitHub Actions工作流运行成功
- [ ] 网站可正常访问

## 🐛 常见问题

### 1. 404 错误
如果访问网站时出现404错误，检查：
- GitHub Pages是否已正确启用
- base路径配置是否正确
- 构建是否成功完成

### 2. 样式或资源丢失
如果页面显示但样式丢失：
- 检查浏览器开发者工具的网络选项卡
- 确认资源路径是否正确
- 验证vite.config.ts中的base配置

### 3. GitHub Actions失败
如果自动部署失败：
- 检查Actions选项卡中的错误日志
- 确认package.json中的构建脚本正确
- 检查依赖是否有兼容性问题

## 🔄 更新部署

当您需要更新网站时：
1. 修改代码
2. 提交并推送到master分支
3. GitHub Actions会自动重新部署

## 📞 技术支持

如果遇到部署问题，请检查：
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)