'use client'

import { useEmployees } from '@/hooks/useEmployees'
import { useStore } from '@/store/useStore'
import { Button } from '@/components/ui/Button'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function BookmarksPage() {
  const { employees } = useEmployees()
  const { bookmarks, removeBookmark } = useStore()

  const bookmarkedEmployees = employees.filter(employee => bookmarks.includes(employee.id))

  if (bookmarkedEmployees.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              ← Back to Dashboard
            </Button>
          </Link>
        </div>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <BookmarkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-600">No bookmarks yet</h2>
            <p className="mt-2 text-gray-500">
              Bookmark employees from the dashboard to see them here
            </p>
          </div>
        </div>
      </main>
    )
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

      <h1 className="mb-8 text-2xl font-bold">Bookmarked Employees</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {bookmarkedEmployees.map((employee) => (
          <div
            key={employee.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {employee.firstName} {employee.lastName}
              </h3>
              <button
                onClick={() => removeBookmark(employee.id)}
                className="text-blue-600 hover:text-blue-800"
              >
                <BookmarkIcon className="h-5 w-5" />
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
                  View Details
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