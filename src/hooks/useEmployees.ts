import { useEffect, useState } from 'react'
import { Employee, useStore } from '@/store/useStore'

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']

export function useEmployees() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { employees, setEmployees } = useStore()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20')
        const data = await response.json()
        
        const processedEmployees: Employee[] = data.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
          performance: Math.floor(Math.random() * 5) + 1,
          address: `${user.address.address}, ${user.address.city}`,
          phone: user.phone,
          bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in the industry.`,
          performanceHistory: Array.from({ length: 6 }, (_, i) => ({
            date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            rating: Math.floor(Math.random() * 5) + 1,
          })),
        }))

        setEmployees(processedEmployees)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch employees')
        setIsLoading(false)
      }
    }

    if (employees.length === 0) {
      fetchEmployees()
    } else {
      setIsLoading(false)
    }
  }, [employees.length, setEmployees])

  return { employees, isLoading, error }
} 