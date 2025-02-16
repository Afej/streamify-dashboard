import { Users, Music, DollarSign, Trophy, BarChart3 } from 'lucide-react'
import MetricCard from './components/MetricCard'
import Chart from './components/Charts'
import DataTable from './components/DataTable'
import { useStore } from './store/useStore'

function App() {
  const { metrics, chartData, streams } = useStore()

  const { userGrowth, topSongs, revenueDistribution } = chartData

  const metricCards = [
    {
      title: 'Total Users',
      value: metrics?.totalUsers.toLocaleString() ?? '...',
      icon: Users,
      change: metrics?.changes.totalUsers,
    },
    {
      title: 'Active Users',
      value: metrics?.activeUsers.toLocaleString() ?? '...',
      icon: Music,
      change: metrics?.changes.activeUsers,
    },
    {
      title: 'Total Streams',
      value: metrics?.totalStreams ?? '...',
      icon: BarChart3,
      change: metrics?.changes.totalStreams,
    },
    {
      title: 'Revenue',
      value: metrics?.revenue ?? '...',
      icon: DollarSign,
      change: metrics?.changes.revenue,
    },
    {
      title: 'Top Artist',
      value: metrics?.topArtist ?? '...',
      icon: Trophy,
    },
  ]

  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <div className='px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Streamify Dashboard
            </h1>
            <div className='text-sm text-gray-500'>
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>

          {/* Metric Cards */}
          <div className='grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-5'>
            {metricCards.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Charts */}
          <div className='grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3'>
            {userGrowth && (
              <>
                <div className=''>
                  <Chart data={userGrowth} title='User Growth' type='line' />
                </div>
              </>
            )}

            {topSongs && (
              <>
                <div className=''>
                  <Chart
                    data={topSongs}
                    title='Top 5 Streamed Songs'
                    type='bar'
                  />
                </div>
              </>
            )}

            {revenueDistribution && (
              <>
                <div className=''>
                  <Chart
                    data={revenueDistribution}
                    title='Revenue Distribution'
                    type='pie'
                  />
                </div>
              </>
            )}
          </div>

          {/* Data Table */}
          <div className='p-6 bg-white rounded-lg shadow-md'>
            <h2 className='mb-4 text-xl font-semibold text-gray-900'>
              Recent Streams
            </h2>
            <DataTable streams={streams} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
