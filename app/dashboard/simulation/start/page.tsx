import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { generateSimulationPrompt, SimulationSettings } from '@/lib/generateSimulationPrompt'
import { Play, ArrowLeft, Eye, Settings2 } from 'lucide-react'

export default async function SimulationStartPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth')
    }

    // Fetch the latest simulation settings
    const { data: settings, error } = await supabase
        .from('simulation_settings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (error || !settings) {
        // If no settings found, redirect back to configuration
        redirect('/dashboard/simulation')
    }

    const typedSettings = settings as SimulationSettings
    const prompt = generateSimulationPrompt(typedSettings)

    // Encode prompt for URL
    const promptParam = encodeURIComponent(prompt)

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Ready to Start?</h1>
                    <p className="text-gray-400 mt-2">Running final checks on your simulation parameters.</p>
                </div>
                <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
                    <Link href="/dashboard/simulation">
                        <Settings2 className="w-4 h-4 mr-2" />
                        Edit Settings
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Settings Summary Card */}
                <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Simulation Configuration</CardTitle>
                        <CardDescription className="text-gray-400">
                            Review your settings before beginning the call
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Product</h3>
                                <p className="text-white font-medium">{typedSettings.product_name}</p>
                                <p className="text-sm text-gray-400 line-clamp-2">{typedSettings.product_description || 'No description provided'}</p>
                                <p className="text-xs text-gray-500 mt-1">{typedSettings.product_price_range}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Goals</h3>
                                <p className="text-white">{typedSettings.goals || 'General Practice'}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {typedSettings.practice_areas.map((area) => (
                                        <span key={area} className="px-2 py-1 rounded-full bg-white/10 text-xs text-white border border-white/10">
                                            {area.replace('-', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Prospect Profile</h3>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-200 text-xs border border-blue-500/30">
                                        {typedSettings.prospect_personality}
                                    </span>
                                    <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-200 text-xs border border-purple-500/30">
                                        {typedSettings.prospect_tone}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300">
                                    {typedSettings.prospect_role || 'Unknown Role'} • {typedSettings.prospect_industry || 'Unknown Industry'}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-1">Difficulty Settings</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Difficulty:</span>
                                        <span className="text-white capitalize">{typedSettings.difficulty}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Objections:</span>
                                        <span className="text-white capitalize">{typedSettings.objections_level}</span>
                                    </div>
                                    {typedSettings.objections_list.length > 0 && (
                                        <div className="pt-2">
                                            <p className="text-xs text-gray-500 mb-1">Specific Objections:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {typedSettings.objections_list.map(obj => (
                                                    <span key={obj} className="text-xs text-red-300 bg-red-950/30 px-1.5 py-0.5 rounded border border-red-900/50">
                                                        {obj}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Prompt Preview */}
                <Card className="border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm md:col-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                <Eye className="w-4 h-4 text-[#7AFF9B]" />
                                System Prompt Preview
                            </CardTitle>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">AI Configuration</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <details className="group">
                            <summary className="flex items-center text-sm font-medium text-gray-400 cursor-pointer hover:text-[#7AFF9B] transition-colors select-none">
                                <span className="group-open:hidden">View Generated Prompt</span>
                                <span className="hidden group-open:block">Hide Generated Prompt</span>
                            </summary>
                            <div className="mt-4 p-4 rounded-lg bg-black/40 border border-white/10 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                {prompt}
                            </div>
                        </details>
                    </CardContent>
                </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="outline" asChild className="flex-1 border-white/10 hover:bg-white/5 hover:text-white text-gray-300">
                    <Link href="/dashboard/simulation">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Settings
                    </Link>
                </Button>
                <Button size="lg" asChild className="flex-[2] bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold hover:opacity-90 transition-opacity">
                    <Link href={`/dashboard/simulation/call?settingsId=${settings.id}`}>
                        <Play className="w-5 h-5 mr-2" />
                        Start Call
                    </Link>
                </Button>
            </div>
        </div>
    )
}
