import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and information.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Profile Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-white/5 border-white/10 text-gray-400"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            <Button className="bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold hover:opacity-90 transition-opacity" disabled>
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Preferences</CardTitle>
            <CardDescription className="text-gray-400">
              Customize your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              <p>Preference settings coming soon...</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Subscription</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Current Plan</p>
                  <p className="text-sm text-gray-400">Free Plan</p>
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5 text-gray-300" disabled>
                  Upgrade
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

