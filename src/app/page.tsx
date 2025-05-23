'use client'

import { useState } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Home() {
  const { employees, isLoading, error } = useEmployees()
  const { addBookmark, removeBookmark, isBookmarked } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState<string[]>([])
  const [ratingFilter, setRatingFilter] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const departments = Array.from(new Set(employees.map(emp => emp.department)))

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter.length === 0 || departmentFilter.includes(employee.department)
    const matchesRating = ratingFilter.length === 0 || ratingFilter.includes(employee.performance)

    return matchesSearch && matchesDepartment && matchesRating
  })

  const clearFilters = () => {
    setDepartmentFilter([])
    setRatingFilter([])
    setSearchQuery('')
  }

  const activeFilterCount = departmentFilter.length + ratingFilter.length + (searchQuery ? 1 : 0)

  const toggleDepartment = (dept: string) => {
    setDepartmentFilter(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    )
  }

  const toggleRating = (rating: number) => {
    setRatingFilter(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-64 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <FunnelIcon className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Filter Options</h3>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">Department</h4>
                      <div className="space-y-2">
                        {departments.map(dept => (
                          <label key={dept} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={departmentFilter.includes(dept)}
                              onChange={() => toggleDepartment(dept)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{dept}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 font-medium text-gray-700">Performance Rating</h4>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <label key={rating} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={ratingFilter.includes(rating)}
                              onChange={() => toggleRating(rating)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">
                              {rating} {rating === 1 ? 'Star' : 'Stars'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {employee.firstName} {employee.lastName}
              </h3>
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
                  <BookmarkSolidIcon className="h-5 w-5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <p className="mb-2 text-sm text-gray-600">{employee.email}</p>
            <p className="mb-2 text-sm text-gray-600">Age: {employee.age}</p>
            <p className="mb-4 text-sm text-gray-600">Department: {employee.department}</p>

            <div className="mb-4 flex items-center">
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

            <div className="flex gap-2">
              <Link href={`/employee/${employee.id}`}>
                <Button variant="primary" size="sm">
                  View
                </Button>
              </Link>
              <Button variant="secondary" size="sm">
                Promote
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
} 