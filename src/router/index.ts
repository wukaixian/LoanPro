import { createRouter, createWebHistory } from 'vue-router'
import LoanCalculator from '../views/LoanCalculator.vue'
import EarlyRepayment from '../views/EarlyRepayment.vue'
import Comparison from '../views/Comparison.vue'

const routes = [
  {
    path: '/',
    redirect: '/loan-calculator'
  },
  {
    path: '/loan-calculator',
    name: 'LoanCalculator',
    component: LoanCalculator
  },
  {
    path: '/early-repayment',
    name: 'EarlyRepayment',
    component: EarlyRepayment
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: Comparison
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 