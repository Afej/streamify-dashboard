import { Stream, ChartData } from './types'

// Generate mock data for the past 12 months
const generateMonthlyData = () => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    return d.toLocaleString('default', { month: 'short' })
  }).reverse()

  const totalUsers = Array.from(
    { length: 12 },
    (_, i) => 100000 + i * 15000 + Math.floor(Math.random() * 5000)
  )
  const activeUsers = totalUsers.map((t) =>
    Math.floor(t * (0.6 + Math.random() * 0.2))
  )

  return {
    months,
    totalUsers,
    activeUsers,
  }
}

const monthlyData = generateMonthlyData()

export const userGrowthData = {
  labels: monthlyData.months,
  datasets: [
    {
      label: 'Total Users',
      data: monthlyData.totalUsers,
      borderColor: '#3b82f6',
      backgroundColor: '#3b82f6',
    },
    {
      label: 'Active Users',
      data: monthlyData.activeUsers,
      borderColor: '#10b981',
      backgroundColor: '#10b981',
    },
  ],
}

export const revenueDistributionData = {
  labels: [
    'Premium Subscriptions',
    'Advertisements',
    'Merchandise',
    'Partnerships',
  ],
  datasets: [
    {
      data: [65, 20, 10, 5],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'],
    },
  ],
}

export const topSongsData: ChartData = {
  labels: [
    'Shape of You',
    'Blinding Lights',
    'Dance Monkey',
    'Someone Like You',
    'Uptown Funk',
  ],
  datasets: [
    {
      label: 'Streams (millions)',
      data: [2.8, 2.3, 2.1, 1.9, 1.7],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ec4899'],
    },
  ],
}

export const dashboardMetrics = {
  totalUsers: 215000,
  activeUsers: 142000,
  totalStreams: '1.2M',
  revenue: '$2.4M',
  topArtist: 'Ed Sheeran',
  changes: {
    totalUsers: 12.5,
    activeUsers: 8.2,
    totalStreams: 15.3,
    revenue: 22.4,
  },
}

// Generate mock streams data
const songs = [
  { name: 'Shape of You', artist: 'Ed Sheeran' },
  { name: 'Blinding Lights', artist: 'The Weeknd' },
  { name: 'Dance Monkey', artist: 'Tones and I' },
  { name: 'Someone Like You', artist: 'Adele' },
  { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
]

export const generateStreams = (count: number): Stream[] => {
  return Array.from({ length: count }, (_, i) => {
    const song = songs[Math.floor(Math.random() * songs.length)]
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    return {
      id: `stream-${i}`,
      songName: song.name,
      artist: song.artist,
      dateStreamed: date.toISOString(),
      streamCount: Math.floor(Math.random() * 1000000) + 100000,
      userId: `user-${Math.floor(Math.random() * 1000)}`,
    }
  })
}

export const streams = generateStreams(100)
