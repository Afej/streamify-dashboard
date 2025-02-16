export interface Stream {
  id: string
  songName: string
  artist: string
  dateStreamed: string
  streamCount: number
  userId: string
}

export interface MetricData {
  totalUsers: number
  activeUsers: number
  totalStreams: string
  revenue: string
  topArtist: string
  changes: {
    totalUsers: number
    activeUsers: number
    totalStreams: number
    revenue: number
  }
}

export interface MetricCard {
  title: string
  value: string | number
  icon: React.ElementType
  change?: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label?: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string
    borderWidth?: number
  }[]
}
