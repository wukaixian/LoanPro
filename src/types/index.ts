export interface LoanInfo {
  amount: number // 贷款金额
  rate: number // 年利率
  years: number // 贷款年限
  type: 'equal-payment' | 'equal-principal' // 还款方式
}

export interface PaymentSchedule {
  period: number // 期数
  payment: number // 月供
  principal: number // 本金
  interest: number // 利息
  balance: number // 剩余本金
}

export interface EarlyRepaymentInfo {
  currentPeriod: number // 当前期数
  repaymentAmount: number // 提前还款金额
  type: 'reduce-period' | 'reduce-payment' // 缩短年限或减少月供
}

export interface ComparisonResult {
  totalInterest: number // 总利息
  totalPayment: number // 总还款
  monthlyPayment: number // 月供
  schedule: PaymentSchedule[] // 还款计划
} 