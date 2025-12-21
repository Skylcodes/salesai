'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsConfirmation, setNeedsConfirmation] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setNeedsConfirmation(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Check if email confirmation is required
      // If there's a user but no session, email confirmation is needed
      if (data.user && !data.session) {
        setNeedsConfirmation(true)
        setLoading(false)
      } else {
        // User is already confirmed (or confirmation disabled in Supabase settings)
        router.push('/dashboard')
        router.refresh()
      }
    }
  }

  // Show confirmation message if needed
  if (needsConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <Card className="relative z-10 w-full max-w-md border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Check your email</CardTitle>
            <CardDescription className="text-gray-400">
              We've sent a confirmation link to
            </CardDescription>
            <p className="text-white font-medium mt-2">{email}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-950/20 border border-blue-800 rounded-md">
              <p className="text-sm text-blue-300">
                Please check your email and click the confirmation link to activate your account.
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Didn't receive the email?</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Check your spam folder</li>
                <li>Make sure you entered the correct email address</li>
                <li>Wait a few minutes and try again</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={() => {
                setNeedsConfirmation(false)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              variant="outline"
              className="w-full border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
            >
              Back to sign up
            </Button>
            <p className="text-sm text-center text-gray-400">
              Already confirmed?{' '}
              <Link href="/login" className="text-[#7AFF9B] hover:text-[#4ade80] transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <Card className="relative z-10 w-full max-w-md border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Create an account</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-800/50 rounded-md backdrop-blur-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
            <p className="text-sm text-center text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-[#7AFF9B] hover:text-[#4ade80] transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

