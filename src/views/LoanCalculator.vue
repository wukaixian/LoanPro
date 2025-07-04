<template>
  <div class="loan-calculator">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">🏦 贷款计算器</h1>
      <p class="page-subtitle">精确计算您的贷款方案，智能分析还款计划</p>
    </div>

    <!-- 计算表单 -->
    <div class="calculator-section">
      <div class="form-container">
        <div class="form-header">
          <h2>📝 贷款信息</h2>
          <p>请输入您的贷款详情</p>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">💰</span>
              <span class="label-text">贷款金额</span>
            </label>
            <div class="input-wrapper">
              <el-input-number
                v-model="loanForm.amount"
                :min="10000"
                :max="10000000"
                :step="10000"
                :controls="false"
                :formatter="(value: number) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="(value: string) => value.replace(/\$\s?|(,*)/g, '')"
                placeholder="请输入贷款金额"
                class="modern-input"
              />
              <span class="input-unit">元</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📊</span>
              <span class="label-text">年利率</span>
            </label>
            <div class="input-wrapper">
              <el-input-number
                v-model="loanForm.rate"
                :min="0.1"
                :max="20"
                :step="0.1"
                :precision="2"
                :controls="false"
                placeholder="请输入年利率"
                class="modern-input"
              />
              <span class="input-unit">%</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📅</span>
              <span class="label-text">贷款年限</span>
            </label>
            <div class="input-wrapper">
              <el-input-number
                v-model="loanForm.years"
                :min="1"
                :max="30"
                :step="1"
                :controls="false"
                placeholder="请输入贷款年限"
                class="modern-input"
              />
              <span class="input-unit">年</span>
            </div>
          </div>

          <div class="form-group full-width">
            <label class="form-label">
              <span class="label-icon">🔄</span>
              <span class="label-text">还款方式</span>
            </label>
            <div class="radio-group">
              <div 
                :class="['radio-item', { active: loanForm.type === 'equal-payment' }]"
                @click="loanForm.type = 'equal-payment'"
              >
                <div class="radio-icon">⚖️</div>
                <div class="radio-content">
                  <div class="radio-title">等额本息</div>
                  <div class="radio-desc">每月还款额相同</div>
                </div>
              </div>
              <div 
                :class="['radio-item', { active: loanForm.type === 'equal-principal' }]"
                @click="loanForm.type = 'equal-principal'"
              >
                <div class="radio-icon">📉</div>
                <div class="radio-content">
                  <div class="radio-title">等额本金</div>
                  <div class="radio-desc">月供递减，前期较高</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-primary" @click="calculateLoanResult">
            <span class="btn-icon">🧮</span>
            <span>开始计算</span>
          </button>
          <button class="btn btn-secondary" @click="resetForm">
            <span class="btn-icon">🔄</span>
            <span>重置</span>
          </button>
        </div>
      </div>

      <!-- 计算结果 -->
      <div v-if="result" class="result-container">
        <div class="result-header">
          <h2>📈 计算结果</h2>
          <p>基于您的贷款信息计算得出</p>
        </div>

        <div class="result-cards">
          <div class="result-card primary">
            <div class="card-icon">🏦</div>
            <div class="card-content">
              <div class="card-label">贷款总额</div>
              <div class="card-value">{{ formatMoney(loanForm.amount) }}</div>
            </div>
          </div>

          <div class="result-card success">
            <div class="card-icon">📊</div>
            <div class="card-content">
              <div class="card-label">总利息</div>
              <div class="card-value">{{ formatMoney(result.totalInterest) }}</div>
            </div>
          </div>

          <div class="result-card warning">
            <div class="card-icon">💰</div>
            <div class="card-content">
              <div class="card-label">总还款</div>
              <div class="card-value">{{ formatMoney(result.totalPayment) }}</div>
            </div>
          </div>

          <div class="result-card info">
            <div class="card-icon">📅</div>
            <div class="card-content">
              <div class="card-label">{{ loanForm.type === 'equal-payment' ? '月供' : '首期月供' }}</div>
              <div class="card-value">{{ formatMoney(result.monthlyPayment) }}</div>
            </div>
          </div>
        </div>

        <!-- 详细分析 -->
        <div class="analysis-section">
          <div class="tabs-container">
            <div class="tab-header">
              <button 
                :class="['tab-btn', { active: activeTab === 'schedule' }]"
                @click="activeTab = 'schedule'"
              >
                📋 还款计划
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'chart' }]"
                @click="activeTab = 'chart'"
              >
                📊 图表分析
              </button>
            </div>

            <div class="tab-content">
              <div v-if="activeTab === 'schedule'" class="schedule-tab">
                <div class="table-wrapper">
                  <table class="modern-table">
                    <thead>
                      <tr>
                        <th>期数</th>
                        <th>月供</th>
                        <th>本金</th>
                        <th>利息</th>
                        <th>剩余本金</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in paginatedSchedule" :key="item.period">
                        <td>{{ item.period }}</td>
                        <td>{{ formatMoney(item.payment) }}</td>
                        <td>{{ formatMoney(item.principal) }}</td>
                        <td>{{ formatMoney(item.interest) }}</td>
                        <td>{{ formatMoney(item.balance) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="pagination-wrapper">
                  <el-pagination
                    v-model:current-page="currentPage"
                    :page-size="pageSize"
                    :total="result.schedule.length"
                    layout="total, prev, pager, next"
                    :hide-on-single-page="false"
                    class="modern-pagination"
                  />
                </div>
              </div>

              <div v-if="activeTab === 'chart'" class="chart-tab">
                <div class="chart-wrapper">
                  <canvas ref="chartCanvas" width="800" height="400"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import type { LoanInfo, ComparisonResult } from '../types'
import { calculateLoan, formatMoney } from '../utils/loanCalculator'

const loanForm = ref<LoanInfo>({
  amount: 1000000,
  rate: 4.9,
  years: 30,
  type: 'equal-payment'
})

const result = ref<ComparisonResult | null>(null)
const activeTab = ref('schedule')
const currentPage = ref(1)
const pageSize = ref(10)
const chartCanvas = ref<HTMLCanvasElement>()

const paginatedSchedule = computed(() => {
  if (!result.value) return []
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return result.value.schedule.slice(start, end)
})

const calculateLoanResult = () => {
  result.value = calculateLoan(loanForm.value)
  currentPage.value = 1
  nextTick(() => {
    if (activeTab.value === 'chart') {
      drawChart()
    }
  })
}

const resetForm = () => {
  loanForm.value = {
    amount: 1000000,
    rate: 4.9,
    years: 30,
    type: 'equal-payment'
  }
  result.value = null
  currentPage.value = 1
}

const drawChart = () => {
  if (!chartCanvas.value || !result.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return
  
  const canvas = chartCanvas.value
  const width = canvas.width
  const height = canvas.height
  
  // 清空画布
  ctx.clearRect(0, 0, width, height)
  
  // 绘制背景
  ctx.fillStyle = '#f8f9fa'
  ctx.fillRect(0, 0, width, height)
  
  // 绘制标题
  ctx.fillStyle = '#333'
  ctx.font = '18px Arial'
  ctx.textAlign = 'center'
  ctx.fillText('本金与利息构成图', width / 2, 30)
  
  // 计算数据
  const schedule = result.value.schedule
  const maxPayment = Math.max(...schedule.map(item => item.payment))
  const chartHeight = height - 100
  const chartWidth = width - 100
  const barWidth = Math.max(1, chartWidth / schedule.length)
  
  // 绘制柱状图
  schedule.forEach((item, index) => {
    const x = 50 + index * barWidth
    const principalHeight = (item.principal / maxPayment) * chartHeight
    const interestHeight = (item.interest / maxPayment) * chartHeight
    
    // 绘制本金部分
    ctx.fillStyle = '#4CAF50'
    ctx.fillRect(x, height - 50 - principalHeight, barWidth - 1, principalHeight)
    
    // 绘制利息部分
    ctx.fillStyle = '#FF6B6B'
    ctx.fillRect(x, height - 50 - principalHeight - interestHeight, barWidth - 1, interestHeight)
  })
  
  // 绘制图例
  ctx.fillStyle = '#4CAF50'
  ctx.fillRect(width - 150, 50, 20, 15)
  ctx.fillStyle = '#333'
  ctx.font = '14px Arial'
  ctx.textAlign = 'left'
  ctx.fillText('本金', width - 120, 62)
  
  ctx.fillStyle = '#FF6B6B'
  ctx.fillRect(width - 150, 75, 20, 15)
  ctx.fillStyle = '#333'
  ctx.fillText('利息', width - 120, 87)
}

watch(activeTab, (newTab) => {
  if (newTab === 'chart' && result.value) {
    nextTick(() => {
      drawChart()
    })
  }
})

// 初始计算
calculateLoanResult()
</script>

<style scoped>
.loan-calculator {
  min-height: 100%;
  padding: 0;
}

/* 页面标题 */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 计算器主体 */
.calculator-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* 表单容器 */
.form-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.label-icon {
  font-size: 1.2rem;
}

.label-text {
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-wrapper .modern-input {
  flex: 1;
}

.input-unit {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
  pointer-events: none;
  z-index: 1;
}

:deep(.modern-input) {
  width: 100%;
}

:deep(.modern-input .el-input__wrapper) {
  border-radius: 12px;
  border: 2px solid #e3f2fd;
  padding: 8px 16px;
  box-shadow: none;
  transition: all 0.3s ease;
  background: white;
}

:deep(.modern-input .el-input__wrapper:hover) {
  border-color: #90caf9;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
}

:deep(.modern-input .el-input__wrapper.is-focus) {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

:deep(.modern-input .el-input__inner) {
  border: none;
  padding: 8px 24px 8px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #2c3e50;
  background: transparent;
  box-shadow: none;
  text-align: left;
}

:deep(.modern-input .el-input__inner:focus) {
  box-shadow: none;
}

:deep(.modern-input .el-input-number__decrease),
:deep(.modern-input .el-input-number__increase) {
  display: none;
}

:deep(.modern-input .el-input__inner::placeholder) {
  color: #bdbdbd;
  font-weight: 400;
}

:deep(.modern-input.is-disabled .el-input__wrapper) {
  background: #f5f5f5;
  border-color: #e0e0e0;
  cursor: not-allowed;
}

:deep(.modern-input.is-disabled .el-input__inner) {
  color: #bdbdbd;
  cursor: not-allowed;
}

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e3f2fd;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.radio-item:hover {
  border-color: #2196f3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.15);
}

.radio-item.active {
  border-color: #2196f3;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
}

.radio-icon {
  font-size: 1.5rem;
}

.radio-content {
  flex: 1;
}

.radio-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.radio-desc {
  font-size: 0.8rem;
  color: #7f8c8d;
}

/* 表单按钮 */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: white;
  color: #666;
  border: 2px solid #e3f2fd;
}

.btn-secondary:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.1rem;
}

/* 结果容器 */
.result-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.result-header {
  text-align: center;
  margin-bottom: 2rem;
}

.result-header h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.result-header p {
  color: #7f8c8d;
  font-size: 0.9rem;
}

/* 结果卡片 */
.result-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.result-card.primary {
  border-color: #2196f3;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.result-card.success {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.result-card.warning {
  border-color: #ff9800;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
}

.result-card.info {
  border-color: #9c27b0;
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
}

.card-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.card-content {
  flex: 1;
}

.card-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.card-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

/* 分析区域 */
.analysis-section {
  margin-top: 2rem;
}

.tabs-container {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.tab-header {
  display: flex;
  background: #f5f5f5;
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #666;
}

.tab-btn:hover {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
}

.tab-btn.active {
  background: #2196f3;
  color: white;
}

.tab-content {
  background: white;
  padding: 2rem;
}

/* 表格样式 */
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th {
  background: #f8f9fa;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e0e0e0;
}

.modern-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.modern-table tr:hover {
  background: #f8f9fa;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

:deep(.modern-pagination) {
  --el-pagination-button-color: #666;
  --el-pagination-hover-color: #2196f3;
}

/* 图表样式 */
.chart-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #f8f9fa;
  border-radius: 12px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .calculator-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .form-container,
  .result-container {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .result-cards {
    grid-template-columns: 1fr;
  }
  
  .radio-group {
    flex-direction: column;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }
  
  .form-container,
  .result-container {
    padding: 1rem;
  }
  
  .tab-content {
    padding: 1rem;
  }
}
</style> 