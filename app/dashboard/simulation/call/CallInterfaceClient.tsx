'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRealtimeConnection } from '@/hooks/use-realtime-connection'
import { CallControls } from '@/components/simulation/CallControls'
import { LiveTranscript } from '@/components/simulation/LiveTranscript'
import { Mic, Activity, ShieldCheck, Loader2 } from 'lucide-react'

interface CallInterfaceClientProps {
    initialPrompt: string
}

export function CallInterfaceClient({ initialPrompt }: CallInterfaceClientProps) {
    const router = useRouter()

    // Use the established hook for connection logic
    const {
        status,
        items,
        connect,
        disconnect,
        isMuted,
        toggleMute,
        error
    } = useRealtimeConnection({
        prompt: initialPrompt,
        onDisconnect: () => {
            // Small delay before redirecting on end
            setTimeout(() => router.push('/dashboard/simulation/start'), 1500)
        }
    })

    // Connect on mount
    useEffect(() => {
        connect()
        // Hook handles cleanup
    }, [connect])

    return (
        <div className="w-full max-w-5xl h-full flex flex-col gap-8">
            {/* Header Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#7AFF9B]/10 border border-[#7AFF9B]/20 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-[#7AFF9B]" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">AI Sales Proxy Simulation</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`h-2 w-2 rounded-full ${status === 'connected' ? 'bg-[#7AFF9B] animate-pulse' : 'bg-gray-500'}`} />
                            <p className="text-sm text-gray-400 capitalize">
                                {error ? 'Connection Error' : status}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
                    <Activity className="w-4 h-4 text-[#7AFF9B]" />
                    Voice Session Active
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-center">
                    <p className="font-semibold text-sm">Hardware/Connection Error: {error}</p>
                    <p className="text-xs mt-1 opacity-70">Please check your microphone permissions and refresh the page.</p>
                </div>
            )}

            {/* Main Call View */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {/* Left: Visualization & Controls */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex-1 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(122,255,155,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Avatar Container */}
                        <div className="relative">
                            <div className={`h-48 w-48 rounded-full border-4 ${status === 'connected' ? 'border-[#7AFF9B]' : 'border-white/10'} bg-black/40 flex items-center justify-center relative z-10 transition-all duration-500 shadow-[0_0_50px_rgba(122,255,155,0.1)]`}>
                                {status === 'connecting' ? (
                                    <Loader2 className="w-16 h-16 text-[#7AFF9B] animate-spin" />
                                ) : (
                                    <Mic className={`w-16 h-16 ${status === 'connected' ? 'text-[#7AFF9B]' : 'text-white/20'} transition-colors`} />
                                )}
                            </div>

                            {/* Pulsing rings */}
                            {status === 'connected' && (
                                <>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#7AFF9B]/20 rounded-full animate-ping" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[#7AFF9B]/10 rounded-full animate-ping [animation-delay:500ms]" />
                                </>
                            )}
                        </div>

                        <div className="mt-12 text-center relative z-10 px-6">
                            <p className="text-2xl font-bold text-white mb-2">
                                {status === 'connected' ? 'Prospect is Listening...' : status === 'connecting' ? 'Preparing Neural Engine...' : 'Call Standby'}
                            </p>
                            <p className="text-gray-400 max-w-sm mx-auto text-sm">
                                Speak naturally. The prospect will react to your tone, speed, and any pressure patterns you use.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <CallControls
                            status={status}
                            isMuted={isMuted}
                            onToggleMute={toggleMute}
                            onEndCall={disconnect}
                            onReconnect={() => window.location.reload()}
                        />
                    </div>
                </div>

                {/* Right: Live Transcript */}
                <div className="lg:col-span-1 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col min-h-0">
                    <LiveTranscript items={items} />
                </div>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono tracking-widest uppercase pb-4">
                <div className="flex gap-4">
                    <span>Latency: ~120ms</span>
                    <span>OpenAI Realtime API</span>
                </div>
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-[#7AFF9B]" />
                    E2EE Encrypted Session
                </div>
            </div>
        </div>
    )
}
