import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Alert, AlertDescription } from './ui/alert'
import { Sparkles, Eye, EyeOff } from 'lucide-react'
import { apiService } from '../services/api'

interface LoginProps {
  onLogin: () => void
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await apiService.auth.login(username, password)
      apiService.auth.setToken(response.data.token)
      onLogin()
    } catch (err: any) {
      setError(err.response?.data?.non_field_errors?.[0] || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-4">
      <Card className="w-full max-w-xs shadow-xl">
        <CardHeader className="text-center space-y-3 pb-3 pt-5">
          <div className="flex items-center justify-center space-x-1.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <img 
                src="/favicon_alphaint.png" 
                alt="AlphaInt Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold">AlphaInt</h1>
              <p className="text-[10px] text-muted-foreground">Investment Intelligence</p>
            </div>
          </div>
          <div>
            <CardTitle className="flex items-center justify-center space-x-1.5 text-base">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>Welcome Back</span>
            </CardTitle>
            <p className="text-muted-foreground text-[11px] mt-0.5">
              Sign in to access your dashboard
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-5 pb-5">
          <form onSubmit={handleSubmit} className="space-y-2.5">
            {error && (
              <Alert variant="destructive" className="py-1.5">
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-1">
              <Label htmlFor="username" className="text-xs">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="h-8 text-sm"
                required
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-8 pr-9 text-sm"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-8 px-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Eye className="h-3 w-3 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full h-8 mt-3 text-sm" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1.5"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-3 text-center">
            <p className="text-[10px] text-muted-foreground">
              Demo credentials: admin / admin
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
