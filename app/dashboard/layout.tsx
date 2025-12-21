import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'

export default async function DashboardLayout({
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

  // Check if onboarding is complete
  const { data: onboarding } = await supabase
    .from('user_onboarding')
    .select('id')
    .eq('user_id', user.id)
    .single()

  // If onboarding is not complete, the onboarding page will handle the redirect
  // We don't need to check here since the onboarding page has its own layout

  return (
    <div className="min-h-screen bg-[#000000] flex relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <div className="flex-1 flex flex-col">
          <DashboardNavbar user={user} />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}

