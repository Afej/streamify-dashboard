import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'
import { ChartData } from '../types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

interface ChartProps {
  data: ChartData
  title: string
  type: 'line' | 'pie' | 'bar'
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  maintainAspectRatio: false,
}

const Chart: React.FC<ChartProps> = ({ data, title, type }) => {
  const ChartComponent = {
    line: Line,
    pie: Pie,
    bar: Bar,
  }[type]

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h3 className='mb-4 text-lg font-medium text-gray-900'>{title}</h3>
      <div className='h-64'>
        <ChartComponent data={data} options={chartOptions} />
      </div>
    </div>
  )
}

export default Chart
