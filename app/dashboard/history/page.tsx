import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Call History</h1>
        <p className="text-gray-400 mt-2">View and analyze your past simulation sessions.</p>
      </div>

      <Card className="border-gray-800 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Simulation Sessions</CardTitle>
          <CardDescription className="text-gray-400">
            All your practice calls in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-400">
            <p>No simulation history yet.</p>
            <p className="text-sm mt-2">Start your first simulation to see it here!</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Filters</CardTitle>
            <CardDescription className="text-gray-400">Filter your history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Filter options coming soon...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Statistics</CardTitle>
            <CardDescription className="text-gray-400">Your performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-400">
              <p>Statistics will appear here once you have simulation data.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

