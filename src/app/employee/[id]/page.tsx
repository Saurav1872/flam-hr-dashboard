'use client'

import { useState } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { motion } from 'framer-motion'

const tabs = ['Overview', 'Projects', 'Feedback'] as const
type Tab = typeof tabs[number]

export default function EmployeePage({ params }: { params: { id: string } }) {
  const { employees } = useEmployees()
  const { addBookmark, removeBookmark, isBookmarked } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>('Overview')

  const employee = employees.find(emp => emp.id === Number(params.id))

  if (!employee) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Employee not found</p>
      </div>
    )
  }

  const getPerformanceColor = (rating: number) => {
    switch (rating) {
      case 1:
        return 'bg-red-100 text-red-800'
      case 2:
        return 'bg-orange-100 text-orange-800'
      case 3:
        return 'bg-yellow-100 text-yellow-800'
      case 4:
        return 'bg-green-100 text-green-800'
      case 5:
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-gray-600">{employee.email}</p>
          </div>
          <button
            onClick={() => {
              if (isBookmarked(employee.id)) {
                removeBookmark(employee.id)
              } else {
                addBookmark(employee.id)
              }
            }}
            className="text-gray-500 hover:text-blue-600"
          >
            {isBookmarked(employee.id) ? (
              <BookmarkSolidIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= employee.performance ? (
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarOutlineIcon className="h-5 w-5 text-yellow-400" />
                )}
              </span>
            ))}
          </div>
          <span className={`rounded-full px-3 py-1 text-sm ${getPerformanceColor(employee.performance)}`}>
            {employee.performance} Stars
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 font-semibold">Contact Information</h3>
            <p className="text-gray-600">Phone: {employee.phone}</p>
            <p className="text-gray-600">Address: {employee.address}</p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Department</h3>
            <p className="text-gray-600">{employee.department}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`mr-4 px-4 py-2 font-medium ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        {activeTab === 'Overview' && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Performance History</h3>
            <div className="space-y-4">
              {employee.performanceHistory.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >
                  <span className="text-gray-600">{record.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= record.rating ? (
                            <StarIcon className="h-4 w-4 text-yellow-400" />
                          ) : (
                            <StarOutlineIcon className="h-4 w-4 text-yellow-400" />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${getPerformanceColor(record.rating)}`}>
                      {record.rating} Stars
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Projects' && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Current Projects</h3>
            <p className="text-gray-600">No active projects at the moment.</p>
          </div>
        )}

        {activeTab === 'Feedback' && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Feedback Form</h3>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select className="w-full rounded-md border border-gray-300 p-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating} Stars
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Comments
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-2"
                  rows={4}
                  placeholder="Enter your feedback..."
                />
              </div>
              <Button variant="primary">Submit Feedback</Button>
            </form>
          </div>
        )}
      </motion.div>
    </main>
  )
} 