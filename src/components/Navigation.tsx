'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, BookmarkIcon, ChartBarIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:border-t-0">
      <div className="flex h-16 items-center justify-center md:h-20">
        <h1 className="text-xl font-bold text-gray-900">HR Dashboard</h1>
      </div>
      <div className="flex justify-around md:block md:space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
} 