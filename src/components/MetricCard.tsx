import React from 'react'
import { MetricCard as MetricCardProps } from '../types'

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
}) => {
  return (
    <div className='flex flex-col p-6 bg-white rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
        <Icon className='w-6 h-6 text-blue-500' />
      </div>
      <div className='flex items-baseline justify-between'>
        <p className='text-2xl font-semibold text-gray-900'>{value}</p>
        {change !== undefined && (
          <span
            className={`text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
            {change >= 0 ? '+' : ''}
            {change}%
          </span>
        )}
      </div>
    </div>
  )
}

export default MetricCard
