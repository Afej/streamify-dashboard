import { create } from 'zustand'
import { MetricData, ChartData, Stream } from '../types'
import {
  dashboardMetrics,
  streams,
  userGrowthData,
  topSongsData,
  revenueDistributionData,
} from '../mockData'

interface StoreState {
  metrics: MetricData | null
  chartData: {
    userGrowth: ChartData | null
    topSongs: ChartData | null
    revenueDistribution: ChartData | null
  }
  streams: Stream[]
}

export const useStore = create<StoreState>(() => ({
  metrics: dashboardMetrics,
  chartData: {
    userGrowth: userGrowthData,
    topSongs: topSongsData,
    revenueDistribution: revenueDistributionData,
  },
  streams,
}))
