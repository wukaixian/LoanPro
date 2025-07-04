<template>
  <div class="early-repayment">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">💸 提前还款计算</h1>
      <p class="page-subtitle">计算提前还款后的节省效果，优化您的还款策略</p>
    </div>

    <!-- 计算表单 -->
    <div class="calculator-section">
      <div class="form-container">
        <div class="form-section">
          <div class="section-header">
            <h3>🏦 原贷款信息</h3>
            <p>请输入您当前的贷款详情</p>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">💰</span>
                <span class="label-text">贷款金额</span>
              </label>
              <div class="input-wrapper">
                <el-input-number
                  v-model="formData.loan.amount"
                  :min="10000"
                  :max="10000000"
                  :step="10000"
                  :controls="false"
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
                  v-model="formData.loan.rate"
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
                  v-model="formData.loan.years"
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

            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🔄</span>
                <span class="label-text">还款方式</span>
              </label>
              <div class="radio-group compact">
                <div 
                  :class="['radio-item', { active: formData.loan.type === 'equal-payment' }]"
                  @click="formData.loan.type = 'equal-payment'"
                >
                  <span class="radio-text">等额本息</span>
                </div>
                <div 
                  :class="['radio-item', { active: formData.loan.type === 'equal-principal' }]"
                  @click="formData.loan.type = 'equal-principal'"
                >
                  <span class="radio-text">等额本金</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="section-header">
            <h3>🎯 提前还款信息</h3>
            <p>设置您的提前还款计划</p>
          </div>
          
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">📆</span>
                <span class="label-text">当前期数</span>
              </label>
              <div class="input-wrapper">
                <el-input-number
                  v-model="formData.earlyRepayment.currentPeriod"
                  :min="1"
                  :max="formData.loan.years * 12"
                  :step="1"
                  :controls="false"
                  placeholder="已还款期数"
                  class="modern-input"
                />
                <span class="input-unit">期</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">💵</span>
                <span class="label-text">提前还款金额</span>
              </label>
              <div class="input-wrapper">
                <el-input-number
                  v-model="formData.earlyRepayment.repaymentAmount"
                  :min="1000"
                  :max="formData.loan.amount"
                  :step="1000"
                  :controls="false"
                  placeholder="请输入提前还款金额"
                  class="modern-input"
                />
                <span class="input-unit">元</span>
              </div>
            </div>

            <div class="form-group full-width">
              <label class="form-label">
                <span class="label-icon">⚙️</span>
                <span class="label-text">还款类型</span>
              </label>
              <div class="radio-group">
                <div 
                  :class="['radio-item', { active: formData.earlyRepayment.type === 'reduce-period' }]"
                  @click="formData.earlyRepayment.type = 'reduce-period'"
                >
                  <div class="radio-icon">⏰</div>
                  <div class="radio-content">
                    <div class="radio-title">缩短年限</div>
                    <div class="radio-desc">保持月供不变，缩短还款时间</div>
                  </div>
                </div>
                <div 
                  :class="['radio-item', { active: formData.earlyRepayment.type === 'reduce-payment' }]"
                  @click="formData.earlyRepayment.type = 'reduce-payment'"
                >
                  <div class="radio-icon">💰</div>
                  <div class="radio-content">
                    <div class="radio-title">减少月供</div>
                    <div class="radio-desc">保持年限不变，降低月供压力</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-primary" @click="calculateRepayment">
            <span class="btn-icon">🧮</span>
            <span>计算提前还款</span>
          </button>
          <button class="btn btn-secondary" @click="resetForm">
            <span class="btn-icon">🔄</span>
            <span>重置</span>
          </button>
        </div>
      </div>

      <!-- 计算结果 -->
      <div v-if="originalResult && earlyResult" class="result-container">
        <div class="result-header">
          <h2>📈 提前还款对比</h2>
          <p>查看提前还款带来的收益变化</p>
        </div>

        <!-- 对比卡片 -->
        <div class="comparison-cards">
          <div class="comparison-card original">
            <div class="card-header">
              <div class="card-icon">🏦</div>
              <div class="card-title">原方案</div>
            </div>
            <div class="card-metrics">
              <div class="metric">
                <div class="metric-label">总利息</div>
                <div class="metric-value">{{ formatMoney(originalResult.totalInterest) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总还款</div>
                <div class="metric-value">{{ formatMoney(originalResult.totalPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">月供</div>
                <div class="metric-value">{{ formatMoney(originalResult.monthlyPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总期数</div>
                <div class="metric-value">{{ originalResult.schedule.length }}期</div>
              </div>
            </div>
          </div>

          <div class="vs-divider">
            <div class="vs-text">VS</div>
          </div>

          <div class="comparison-card early">
            <div class="card-header">
              <div class="card-icon">💸</div>
              <div class="card-title">提前还款后</div>
            </div>
            <div class="card-metrics">
              <div class="metric">
                <div class="metric-label">总利息</div>
                <div class="metric-value">{{ formatMoney(earlyResult.totalInterest) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总还款</div>
                <div class="metric-value">{{ formatMoney(earlyResult.totalPayment + formData.earlyRepayment.repaymentAmount) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">月供</div>
                <div class="metric-value">{{ formatMoney(earlyResult.monthlyPayment) }}</div>
              </div>
              <div class="metric">
                <div class="metric-label">总期数</div>
                <div class="metric-value">{{ earlyResult.schedule.length }}期</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 节省统计 -->
        <div class="savings-section">
          <div class="savings-header">
            <h3>💰 节省统计</h3>
          </div>
          <div class="savings-cards">
            <div class="saving-card interest">
              <div class="saving-icon">💸</div>
              <div class="saving-content">
                <div class="saving-label">节省利息</div>
                <div class="saving-value">{{ formatMoney(originalResult.totalInterest - earlyResult.totalInterest) }}</div>
              </div>
            </div>
            <div class="saving-card total">
              <div class="saving-icon">🎯</div>
              <div class="saving-content">
                <div class="saving-label">节省总额</div>
                <div class="saving-value">{{ formatMoney(originalResult.totalPayment - (earlyResult.totalPayment + formData.earlyRepayment.repaymentAmount)) }}</div>
              </div>
            </div>
            <div class="saving-card period">
              <div class="saving-icon">⏰</div>
              <div class="saving-content">
                <div class="saving-label">缩短期数</div>
                <div class="saving-value">{{ originalResult.schedule.length - earlyResult.schedule.length }}期</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 建议分析 -->
        <div class="analysis-section">
          <div class="analysis-card">
            <div class="analysis-header">
              <div class="analysis-icon">🤔</div>
              <h4>投资收益分析</h4>
            </div>
            <div class="analysis-content">
              <p>如果将提前还款金额 <strong>{{ formatMoney(formData.earlyRepayment.repaymentAmount) }}</strong> 用于投资，需要获得年化收益率 <strong class="highlight">{{ formatPercent(formData.loan.rate) }}</strong> 以上才能超过提前还款的收益。</p>
            </div>
          </div>

          <div class="analysis-card">
            <div class="analysis-header">
              <div class="analysis-icon">📊</div>
              <h4>现金流分析</h4>
            </div>
            <div class="analysis-content">
              <p>提前还款后，您的月供将 <strong class="highlight">{{ formData.earlyRepayment.type === 'reduce-payment' ? '减少' : '保持不变' }}</strong>，贷款期限将 <strong class="highlight">{{ formData.earlyRepayment.type === 'reduce-period' ? '缩短' : '保持不变' }}</strong>。这将为您的现金流带来积极影响。</p>
            </div>
          </div>

          <div class="analysis-card recommendation">
            <div class="analysis-header">
              <div class="analysis-icon">💡</div>
              <h4>专业建议</h4>
            </div>
            <div class="analysis-content">
              <p>{{ getRecommendation() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { LoanInfo, EarlyRepaymentInfo, ComparisonResult } from '../types'
import { calculateLoan, calculateEarlyRepayment, formatMoney, formatPercent } from '../utils/loanCalculator'

const formData = ref<{
  loan: LoanInfo,
  earlyRepayment: EarlyRepaymentInfo
}>({
  loan: {
    amount: 1000000,
    rate: 4.9,
    years: 30,
    type: 'equal-payment'
  },
  earlyRepayment: {
    currentPeriod: 60,
    repaymentAmount: 200000,
    type: 'reduce-period'
  }
})

const originalResult = ref<ComparisonResult | null>(null)
const earlyResult = ref<ComparisonResult | null>(null)

const calculateRepayment = () => {
  originalResult.value = calculateLoan(formData.value.loan)
  earlyResult.value = calculateEarlyRepayment(formData.value.loan, formData.value.earlyRepayment)
}

const resetForm = () => {
  formData.value = {
    loan: {
      amount: 1000000,
      rate: 4.9,
      years: 30,
      type: 'equal-payment'
    },
    earlyRepayment: {
      currentPeriod: 60,
      repaymentAmount: 200000,
      type: 'reduce-period'
    }
  }
  originalResult.value = null
  earlyResult.value = null
}

const getRecommendation = () => {
  if (!originalResult.value || !earlyResult.value) return ''
  
  const savingsRate = (originalResult.value.totalInterest - earlyResult.value.totalInterest) / formData.value.earlyRepayment.repaymentAmount
  
  if (savingsRate > 0.1) {
    return '🎯 强烈建议进行提前还款！您可以节省大量利息支出，投资回报率很高。'
  } else if (savingsRate > 0.05) {
    return '✅ 提前还款有一定收益，建议结合您的资金流动性需求后决定。'
  } else {
    return '⚠️ 提前还款收益相对较小，建议考虑其他投资机会或保持资金流动性。'
  }
}

// 初始计算
calculateRepayment()
</script>

<style scoped>
.early-repayment {
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

.form-section {
  margin-bottom: 2rem;
}

.form-section:last-of-type {
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.section-header h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.section-header p {
  color: #7f8c8d;
  font-size: 0.9rem;
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

:deep(.modern-input .el-input__wrapper) {
  border-radius: 12px;
  border: 2px solid #e3f2fd;
  padding: 12px 40px 12px 16px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background-color: #fff;
  box-shadow: none;
}

:deep(.modern-input .el-input__wrapper:hover) {
  border-color: #2196f3;
}

:deep(.modern-input .el-input__wrapper.is-focus) {
  border-color: #2196f3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

:deep(.modern-input .el-input__inner) {
  border: none;
  outline: none;
  background: transparent;
  color: #2c3e50;
  font-size: 0.95rem;
  font-weight: 500;
}

:deep(.modern-input .el-input__inner::placeholder) {
  color: #a0a8ae;
  font-weight: 400;
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
  margin-top: 1rem;
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

/* 对比卡片 */
.comparison-cards {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.comparison-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid;
  transition: all 0.3s ease;
}

.comparison-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.comparison-card.original {
  border-color: #2196f3;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.comparison-card.early {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 1.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
}

.card-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.metric {
  text-align: center;
}

.metric-label {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vs-text {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

/* 节省统计 */
.savings-section {
  margin-bottom: 2rem;
}

.savings-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.savings-header h3 {
  color: #2c3e50;
  font-size: 1.3rem;
}

.savings-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.saving-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid;
  transition: all 0.3s ease;
}

.saving-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.saving-card.interest {
  border-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
}

.saving-card.total {
  border-color: #ff9800;
  background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
}

.saving-card.period {
  border-color: #9c27b0;
  background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
}

.saving-icon {
  font-size: 2rem;
  opacity: 0.8;
}

.saving-content {
  flex: 1;
}

.saving-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.saving-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
}

/* 分析区域 */
.analysis-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.analysis-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #2196f3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.analysis-card.recommendation {
  border-left-color: #4caf50;
  background: linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%);
}

.analysis-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.analysis-icon {
  font-size: 1.3rem;
}

.analysis-header h4 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0;
}

.analysis-content p {
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.highlight {
  color: #2196f3;
  font-weight: 600;
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
  
  .comparison-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .vs-divider {
    order: -1;
  }
  
  .card-metrics {
    grid-template-columns: 1fr;
  }
  
  .savings-cards {
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
}
</style> 