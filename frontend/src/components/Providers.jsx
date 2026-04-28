'use client'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'
import { ProgressProvider } from '../context/ProgressContext'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
