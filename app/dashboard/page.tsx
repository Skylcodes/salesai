import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PersonalProgress from '@/components/dashboard/PersonalProgress'
import StartPracticeCard from '@/components/dashboard/StartPracticeCard'
import RecentPerformanceCard from '@/components/dashboard/RecentPerformanceCard'
import DailyGoalCard from '@/components/dashboard/DailyGoalCard'
import SkillBreakdown from '@/components/dashboard/SkillBreakdown'
import AnalyticsGraphs from '@/components/dashboard/AnalyticsGraphs'
import CallHistory from '@/components/dashboard/CallHistory'
import ScriptTools from '@/components/dashboard/ScriptTools'

export default async function DashboardHomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if onboarding is complete
  const { data: onboarding } = await supabase
    .from('user_onboarding')
    .select('full_name')
    .eq('user_id', user.id)
    .single()

  // Redirect to onboarding if not complete
  if (!onboarding) {
    redirect('/dashboard/onboarding')
  }

  return (
    <div className="space-y-8">
      {/* Top: Personal Progress */}
      <PersonalProgress user={user} onboardingData={onboarding} />

      {/* Main Cards Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <StartPracticeCard />
        <RecentPerformanceCard />
        <DailyGoalCard />
      </div>

      {/* Skill Breakdown */}
      <SkillBreakdown />

      {/* Analytics Graphs */}
      <AnalyticsGraphs />

      {/* Call History */}
      <CallHistory />

      {/* Script Tools */}
      <ScriptTools />
    </div>
  )
}
