'use client'

import { useEmployees } from '@/hooks/useEmployees'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsPage() {
  const { employees } = useEmployees()
  const { bookmarks } = useStore()

  // Calculate department-wise average ratings
  const departmentRatings = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = { total: 0, count: 0 }
    }
    acc[employee.department].total += employee.performance
    acc[employee.department].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  const departmentData = {
    labels: Object.keys(departmentRatings),
    datasets: [
      {
        label: 'Average Rating',
        data: Object.values(departmentRatings).map(
          ({ total, count }) => total / count
        ),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  }

  // Generate mock bookmark trends data
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return date.toLocaleString('default', { month: 'short' })
  }).reverse()

  const bookmarkTrendsData = {
    labels: last6Months,
    datasets: [
      {
        label: 'Bookmarks',
        data: last6Months.map(() => Math.floor(Math.random() * 10) + 1),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            ← Back to Dashboard
          </Button>
        </Link>
      </div>

      <h1 className="mb-8 text-2xl font-bold">Analytics Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Department Performance</h2>
          <Bar data={departmentData} options={chartOptions} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Bookmark Trends</h2>
          <Line data={bookmarkTrendsData} options={lineOptions} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Summary</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <h3 className="text-sm font-medium text-blue-800">Total Employees</h3>
              <p className="mt-2 text-2xl font-semibold text-blue-900">
                {employees.length}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <h3 className="text-sm font-medium text-green-800">Bookmarked</h3>
              <p className="mt-2 text-2xl font-semibold text-green-900">
                {bookmarks.length}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <h3 className="text-sm font-medium text-purple-800">
                Average Rating
              </h3>
              <p className="mt-2 text-2xl font-semibold text-purple-900">
                {(
                  employees.reduce((acc, emp) => acc + emp.performance, 0) /
                  employees.length
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 