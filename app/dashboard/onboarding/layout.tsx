import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if onboarding is already complete
  const { data: onboarding } = await supabase
    .from('user_onboarding')
    .select('id')
    .eq('user_id', user.id)
    .single()

  // If onboarding is complete, redirect to dashboard
  if (onboarding) {
    redirect('/dashboard')
  }

  // Onboarding page doesn't show sidebar/navbar
  return <>{children}</>
}

