import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CallInterfaceClient } from './CallInterfaceClient'
import { generateSimulationPrompt } from '@/lib/generateSimulationPrompt'

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CallPage({ searchParams }: PageProps) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth')
    }

    const params = await searchParams
    const settingsId = params.settingsId as string

    if (!settingsId) {
        redirect('/dashboard/simulation')
    }

    // Fetch settings from DB instead of passing huge prompt in URL (fixes 431 error)
    const { data: settings, error } = await supabase
        .from('simulation_settings')
        .select('*')
        .eq('id', settingsId)
        .single()

    if (error || !settings) {
        redirect('/dashboard/simulation')
    }

    // Generate prompt on the server
    const sysPrompt = generateSimulationPrompt(settings)

    return (
        <div className="fixed inset-0 bg-[#0A0A0A] z-50 flex flex-col items-center justify-center p-6 overflow-hidden">
            <CallInterfaceClient initialPrompt={sysPrompt} />
        </div>
    )
}
