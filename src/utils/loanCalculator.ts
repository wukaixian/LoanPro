import type { LoanInfo, PaymentSchedule, EarlyRepaymentInfo, ComparisonResult } from '../types'

/**
 * 计算等额本息还款
 */
export function calculateEqualPayment(loan: LoanInfo): ComparisonResult {
  const { amount, rate, years } = loan
  const monthlyRate = rate / 100 / 12
  const totalPeriods = years * 12
  
  // 月供计算公式
  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPeriods)) / 
                        (Math.pow(1 + monthlyRate, totalPeriods) - 1)
  
  const schedule: PaymentSchedule[] = []
  let balance = amount
  let totalInterest = 0
  
  for (let period = 1; period <= totalPeriods; period++) {
    const interest = balance * monthlyRate
    const principal = monthlyPayment - interest
    balance -= principal
    totalInterest += interest
    
    schedule.push({
      period,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance)
    })
  }
  
  return {
    totalInterest,
    totalPayment: amount + totalInterest,
    monthlyPayment,
    schedule
  }
}

/**
 * 计算等额本金还款
 */
export function calculateEqualPrincipal(loan: LoanInfo): ComparisonResult {
  const { amount, rate, years } = loan
  const monthlyRate = rate / 100 / 12
  const totalPeriods = years * 12
  const principalPayment = amount / totalPeriods
  
  const schedule: PaymentSchedule[] = []
  let balance = amount
  let totalInterest = 0
  
  for (let period = 1; period <= totalPeriods; period++) {
    const interest = balance * monthlyRate
    const payment = principalPayment + interest
    balance -= principalPayment
    totalInterest += interest
    
    schedule.push({
      period,
      payment,
      principal: principalPayment,
      interest,
      balance: Math.max(0, balance)
    })
  }
  
  return {
    totalInterest,
    totalPayment: amount + totalInterest,
    monthlyPayment: schedule[0].payment,
    schedule
  }
}

/**
 * 计算贷款结果
 */
export function calculateLoan(loan: LoanInfo): ComparisonResult {
  if (loan.type === 'equal-payment') {
    return calculateEqualPayment(loan)
  } else {
    return calculateEqualPrincipal(loan)
  }
}

/**
 * 计算提前还款后的结果
 */
export function calculateEarlyRepayment(
  originalLoan: LoanInfo,
  earlyRepayment: EarlyRepaymentInfo
): ComparisonResult {
  const originalResult = calculateLoan(originalLoan)
  const { currentPeriod, repaymentAmount, type } = earlyRepayment
  
  // 获取当前期数的剩余本金
  const currentBalance = originalResult.schedule[currentPeriod - 1].balance
  const newBalance = currentBalance - repaymentAmount
  
  if (newBalance <= 0) {
    // 一次性还清
    return {
      totalInterest: originalResult.schedule.slice(0, currentPeriod).reduce((sum, item) => sum + item.interest, 0),
      totalPayment: originalLoan.amount,
      monthlyPayment: 0,
      schedule: originalResult.schedule.slice(0, currentPeriod)
    }
  }
  
  const monthlyRate = originalLoan.rate / 100 / 12
  const remainingPeriods = originalLoan.years * 12 - currentPeriod
  
  if (type === 'reduce-period') {
    // 缩短年限，保持月供不变
    const originalMonthlyPayment = originalResult.monthlyPayment
    const newPeriods = Math.ceil(
      Math.log(1 + (newBalance * monthlyRate) / originalMonthlyPayment) / Math.log(1 + monthlyRate)
    )
    
    const newLoan: LoanInfo = {
      ...originalLoan,
      amount: newBalance,
      years: newPeriods / 12
    }
    
    const newResult = calculateLoan(newLoan)
    const pastPayments = originalResult.schedule.slice(0, currentPeriod)
    const pastInterest = pastPayments.reduce((sum, item) => sum + item.interest, 0)
    
    return {
      totalInterest: pastInterest + newResult.totalInterest,
      totalPayment: originalLoan.amount + pastInterest + newResult.totalInterest,
      monthlyPayment: newResult.monthlyPayment,
      schedule: [...pastPayments, ...newResult.schedule.map(item => ({
        ...item,
        period: item.period + currentPeriod
      }))]
    }
  } else {
    // 减少月供，保持年限不变
    const newMonthlyPayment = (newBalance * monthlyRate * Math.pow(1 + monthlyRate, remainingPeriods)) / 
                             (Math.pow(1 + monthlyRate, remainingPeriods) - 1)
    
    const newLoan: LoanInfo = {
      ...originalLoan,
      amount: newBalance,
      years: remainingPeriods / 12
    }
    
    const newResult = calculateLoan(newLoan)
    const pastPayments = originalResult.schedule.slice(0, currentPeriod)
    const pastInterest = pastPayments.reduce((sum, item) => sum + item.interest, 0)
    
    return {
      totalInterest: pastInterest + newResult.totalInterest,
      totalPayment: originalLoan.amount + pastInterest + newResult.totalInterest,
      monthlyPayment: newMonthlyPayment,
      schedule: [...pastPayments, ...newResult.schedule.map(item => ({
        ...item,
        period: item.period + currentPeriod
      }))]
    }
  }
}

/**
 * 格式化金额
 */
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2
  }).format(amount)
}

/**
 * 格式化百分比
 */
export function formatPercent(rate: number): string {
  return `${rate.toFixed(2)}%`
} 