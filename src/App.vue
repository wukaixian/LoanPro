<template>
  <div id="app">
    <div class="app-container">
      <!-- 顶部导航栏 -->
      <header class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">💰</div>
            <h1 class="logo-text">LoanPro</h1>
            <span class="logo-subtitle">智能贷款计算器</span>
          </div>
          <nav class="nav-section">
            <div class="nav-tabs">
              <div 
                v-for="(tab, index) in tabs" 
                :key="tab.path"
                :class="['nav-tab', { active: $route.path === tab.path }]"
                @click="navigateTo(tab.path)"
              >
                <div class="tab-icon">{{ tab.icon }}</div>
                <span class="tab-text">{{ tab.name }}</span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <main class="app-main">
        <div class="main-content">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>

      <!-- 底部信息 -->
      <footer class="app-footer">
        <div class="footer-content">
          <p>&copy; 2025 LoanPro. 专业的贷款计算工具</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { path: '/loan-calculator', name: '贷款计算', icon: '🏦' },
  { path: '/early-repayment', name: '提前还款', icon: '💸' },
  { path: '/comparison', name: '方案对比', icon: '📊' }
]

const navigateTo = (path: string) => {
  router.push(path)
}

onMounted(() => {
  if (router.currentRoute.value.path === '/') {
    router.push('/loan-calculator')
  }
})
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.app-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
  pointer-events: none;
}

/* 顶部导航栏 */
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0 2rem;
  position: relative;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.logo-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 0.5rem;
}

.nav-section {
  display: flex;
  align-items: center;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem;
  border-radius: 50px;
  backdrop-filter: blur(10px);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-tab::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-tab:hover::before {
  opacity: 1;
}

.nav-tab.active {
  background: linear-gradient(45deg, #ff6b6b, #ee5a52);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.nav-tab.active::before {
  display: none;
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-text {
  font-size: 0.95rem;
  white-space: nowrap;
}

/* 主要内容区域 */
.app-main {
  flex: 1;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.main-content {
  height: 100%;
  overflow-y: auto;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* 底部信息 */
.app-footer {
  background: rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  position: relative;
  z-index: 100;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header {
    padding: 0 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    height: auto;
    padding: 1rem 0;
  }
  
  .logo-section {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .nav-tabs {
    flex-direction: column;
    width: 100%;
    gap: 0.25rem;
  }
  
  .nav-tab {
    justify-content: center;
    width: 100%;
    padding: 1rem;
  }
  
  .main-content {
    padding: 1rem;
  }
  
  .app-footer {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.5rem;
  }
  
  .logo-subtitle {
    font-size: 0.8rem;
  }
  
  .tab-text {
    font-size: 0.9rem;
  }
}

/* 滚动条样式 */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style> 