<template>
  <div class="comparison">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">📊 贷款方案对比</h1>
      <p class="page-subtitle">对比不同贷款方案的成本收益，选择最优解决方案</p>
    </div>

    <!-- 方案对比表单 -->
      
    <div class="calculator-section">
      <div class="forms-container">
        <div class="scheme-card scheme1">
          <div class="scheme-header">
            <div class="scheme-icon">🏦</div>
            <h3>方案一</h3>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">💰</span>
                <span class="label-text">贷款金额</span>
              </label>
              <div class="input-wrapper">
                <el-input-number
                  v-model="scheme1.amount"
                  :min="10000"
                  :max="10000000"
                  :step="10000"
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
                  v-model="scheme1.rate"
                  :min="0.1"
                  :max="20"
                  :step="0.1"
                  :precision="2"
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
                  v-model="scheme1.years"
                  :min="1"
                  :max="30"
                  :step="1"
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
              <div class="radio-group compact">
                <div 
                  :class="['radio-item', { active: scheme1.type === 'equal-payment' }]"
                  @click="scheme1.type = 'equal-payment'"
                >
                  <span class="radio-text">等额本息</span>
                </div>
                <div 
                  :class="['radio-item', { active: scheme1.type === 'equal-principal' }]"
                  @click="scheme1.type = 'equal-principal'"
                >
                  <span class="radio-text">等额本金</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="vs-section">
          <div class="vs-icon">VS</div>
        </div>

        <div class="scheme-card scheme2">
          <div class="scheme-header">
            <div class="scheme-icon">🏛️</div>
            <h3>方案二</h3>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">💰</span>
                <span class="label-text">贷款金额</span>
              </label>
              <div class="input-wrapper">
                <el-input-number
                  v-model="scheme2.amount"
                  :min="10000"
                  :max="10000000"
                  :step="10000"
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
                  v-model="scheme2.rate"
                  :min="0.1"
                  :max="20"
                  :step="0.1"
                  :precision="2"
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
                  v-model="scheme2.years"
                  :min="1"
                  :max="30"
                  :step="1"
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
              <div class="radio-group compact">
                <div 
                  :class="['radio-item', { active: scheme2.type === 'equal-payment' }]"
                  @click="scheme2.type = 'equal-payment'"
                >
                  <span class="radio-text">等额本息</span>
                </div>
                <div 
                  :class="['radio-item', { active: scheme2.type === 'equal-principal' }]"
                  @click="scheme2.type = 'equal-principal'"
                >
                  <span class="radio-text">等额本金</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" @click="compareSchemes">
          <span class="btn-icon">🧮</span>
          <span>开始对比</span>
        </button>
        <button class="btn btn-secondary" @click="resetForms">
          <span class="btn-icon">🔄</span>
          <span>重置</span>
        </button>
        <button class="btn btn-tertiary" @click="swapSchemes">
          <span class="btn-icon">🔄</span>
          <span>交换方案</span>
        </button>
      </div>

      <!-- 对比结果 -->
      <div v-if="result1 && result2" class="result-section">
        <div class="result-header">
          <h2>📈 对比结果</h2>
          <p>详细分析两个方案的差异和优势</p>
        </div>

        <!-- 结果卡片 -->
        <div class="comparison-results">
          <div class="result-card scheme1-result">
            <div class="card-header">
              <div class="card-icon">🏦</div>
              <div class="card-title">方案一</div>
              <div class="card-subtitle">{{ formatSchemeInfo(scheme1) }}</div>
            </div>
            <div class="card-metrics">
              <div class="metric">
                <div class="metric-label">总利息</div>
                <div class="metric-value">{{ formatMoney(result1.totalInterest) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总还款</div>
                <div class="metric-value">{{ formatMoney(result1.totalPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">月供</div>
                <div class="metric-value">{{ formatMoney(result1.monthlyPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">期数</div>
                <div class="metric-value">{{ result1.schedule.length }}期</div>
              </div>
            </div>
          </div>

          <div class="difference-section">
            <div class="difference-header">差异分析</div>
            <div class="difference-items">
              <div class="diff-item">
                <div class="diff-label">利息差额</div>
                <div :class="['diff-value', getComparisonClass('interest')]">
                  {{ formatDifference('interest') }}
                </div>
              </div>
              <div class="diff-item">
                <div class="diff-label">总额差额</div>
                <div :class="['diff-value', getComparisonClass('total')]">
                  {{ formatDifference('total') }}
                </div>
              </div>
              <div class="diff-item">
                <div class="diff-label">月供差额</div>
                <div :class="['diff-value', getComparisonClass('monthly')]">
                  {{ formatDifference('monthly') }}
                </div>
              </div>
            </div>
            <div class="recommendation-badge">
              <div class="badge-content">{{ getRecommendation() }}</div>
            </div>
          </div>

          <div class="result-card scheme2-result">
            <div class="card-header">
              <div class="card-icon">🏛️</div>
              <div class="card-title">方案二</div>
              <div class="card-subtitle">{{ formatSchemeInfo(scheme2) }}</div>
            </div>
            <div class="card-metrics">
              <div class="metric">
                <div class="metric-label">总利息</div>
                <div class="metric-value">{{ formatMoney(result2.totalInterest) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总还款</div>
                <div class="metric-value">{{ formatMoney(result2.totalPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">月供</div>
                <div class="metric-value">{{ formatMoney(result2.monthlyPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">期数</div>
                <div class="metric-value">{{ result2.schedule.length }}期</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LoanInfo, ComparisonResult } from '../types'
import { calculateLoan, formatMoney, formatPercent } from '../utils/loanCalculator'

const scheme1 = ref<LoanInfo>({
  amount: 1000000,
  rate: 4.9,
  years: 30,
  type: 'equal-payment'
})

const scheme2 = ref<LoanInfo>({
  amount: 1000000,
  rate: 5.2,
  years: 30,
  type: 'equal-payment'
})

const result1 = ref<ComparisonResult | null>(null)
const result2 = ref<ComparisonResult | null>(null)

const compareSchemes = () => {
  result1.value = calculateLoan(scheme1.value)
  result2.value = calculateLoan(scheme2.value)
}

const resetForms = () => {
  scheme1.value = {
    amount: 1000000,
    rate: 4.9,
    years: 30,
    type: 'equal-payment'
  }
  scheme2.value = {
    amount: 1000000,
    rate: 5.2,
    years: 30,
    type: 'equal-payment'
  }
  result1.value = null
  result2.value = null
}

const swapSchemes = () => {
  const temp = { ...scheme1.value }
  scheme1.value = { ...scheme2.value }
  scheme2.value = temp
  
  if (result1.value && result2.value) {
    const tempResult = result1.value
    result1.value = result2.value
    result2.value = tempResult
  }
}

const formatSchemeInfo = (scheme: LoanInfo) => {
  const typeText = scheme.type === 'equal-payment' ? '等额本息' : '等额本金'
  return `${formatMoney(scheme.amount)} • ${formatPercent(scheme.rate)} • ${scheme.years}年 • ${typeText}`
}

const formatDifference = (type: 'interest' | 'total' | 'monthly') => {
  if (!result1.value || !result2.value) return '0'
  
  let diff = 0
  switch (type) {
    case 'interest':
      diff = result1.value.totalInterest - result2.value.totalInterest
      break
    case 'total':
      diff = result1.value.totalPayment - result2.value.totalPayment
      break
    case 'monthly':
      diff = result1.value.monthlyPayment - result2.value.monthlyPayment
      break
  }
  
  const sign = diff >= 0 ? '+' : ''
  return `${sign}${formatMoney(Math.abs(diff))}`
}

const getComparisonClass = (type: 'interest' | 'total' | 'monthly') => {
  if (!result1.value || !result2.value) return 'neutral'
  
  let diff = 0
  switch (type) {
    case 'interest':
      diff = result1.value.totalInterest - result2.value.totalInterest
      break
    case 'total':
      diff = result1.value.totalPayment - result2.value.totalPayment
      break
    case 'monthly':
      diff = result1.value.monthlyPayment - result2.value.monthlyPayment
      break
  }
  
  if (diff > 0) return 'higher'
  if (diff < 0) return 'lower'
  return 'neutral'
}

const getRecommendation = () => {
  if (!result1.value || !result2.value) return ''
  
  const totalDiff = result1.value.totalPayment - result2.value.totalPayment
  const monthlyDiff = result1.value.monthlyPayment - result2.value.monthlyPayment
  
  if (Math.abs(totalDiff) < 1000) {
    return '💡 两个方案成本相近，建议选择月供较低的方案'
  }
  
  if (totalDiff > 0) {
    return monthlyDiff > 0 
      ? '🎯 推荐方案二：总成本更低，月供压力更小'
      : '⚖️ 方案二总成本更低，但月供较高，请根据现金流选择'
  } else {
    return monthlyDiff < 0 
      ? '🎯 推荐方案一：总成本更低，月供压力更小'
      : '⚖️ 方案一总成本更低，但月供较高，请根据现金流选择'
  }
}

// 初始计算
compareSchemes()
</script>

<style scoped>
.comparison {
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
  max-width: 1400px;
  margin: 0 auto;
}

.forms-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: start;
}

.scheme-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.scheme-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.scheme-card.scheme1 {
  border-top: 4px solid #2196f3;
}

.scheme-card.scheme2 {
  border-top: 4px solid #4caf50;
}

.scheme-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.scheme-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.scheme-header h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
}

.vs-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.vs-icon {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
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
}

.input-wrapper .modern-input {
  flex: 1;
}

.input-unit {
  position: absolute;
  right: 12px;
  color: #7f8c8d;
  font-size: 0.9rem;
  pointer-events: none;
}

:deep(.modern-input) {
  width: 100%;
}

:deep(.modern-input .el-input__inner) {
  border-radius: 12px;
  border: 2px solid #e3f2fd;
  padding: 12px 40px 12px 16px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

:deep(.modern-input .el-input__inner:focus) {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

/* 单选按钮组 */
.radio-group {
  display: flex;
  gap: 1rem;
}

.radio-group.compact .radio-item {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  justify-content: center;
  gap: 0;
}

.radio-group.compact .radio-text {
  font-size: 0.9rem;
  font-weight: 500;
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

/* 表单按钮 */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
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

.btn-tertiary {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-tertiary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.btn-icon {
  font-size: 1.1rem;
}

/* 结果区域 */
.result-section {
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

.comparison-results {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: start;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.result-card.scheme1-result {
  border-color: #2196f3;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.result-card.scheme2-result {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.card-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.card-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
}

.metric-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
}

/* 差异分析 */
.difference-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
}

.difference-header {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.difference-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-bottom: 2rem;
}

.diff-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.diff-label {
  font-size: 0.9rem;
  color: #666;
}

.diff-value {
  font-size: 1rem;
  font-weight: 700;
}

.diff-value.higher {
  color: #f44336;
}

.diff-value.lower {
  color: #4caf50;
}

.diff-value.neutral {
  color: #666;
}

.recommendation-badge {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #4caf50 0%, #43a047 100%);
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
}

.badge-content {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .forms-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .vs-section {
    min-height: auto;
    padding: 1rem 0;
  }
  
  .comparison-results {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .difference-section {
    min-height: auto;
    padding: 1rem 0;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .scheme-card {
    padding: 1.5rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .card-metrics {
    grid-template-columns: 1fr;
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
  
  .scheme-card {
    padding: 1rem;
  }
  
  .result-section {
    padding: 1rem;
  }
}
</style> 