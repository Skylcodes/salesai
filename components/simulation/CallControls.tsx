
import { Button } from '@/components/ui/button'
import { Mic, MicOff, PhoneOff, RotateCw, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CallControlsProps {
    status: 'disconnected' | 'connecting' | 'connected' | 'error' | 'ended'
    isMuted: boolean
    onToggleMute: () => void
    onEndCall: () => void
    onReconnect: () => void
}

export function CallControls({
    status,
    isMuted,
    onToggleMute,
    onEndCall,
    onReconnect
}: CallControlsProps) {

    if (status === 'disconnected' || status === 'connecting') {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connecting to neural engine...</span>
                </div>
            </div>
        )
    }

    if (status === 'ended' || status === 'error') {
        return (
            <div className="flex items-center gap-4">
                <Button
                    onClick={onReconnect}
                    variant="outline"
                    className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2"
                >
                    <RotateCw className="w-5 h-5" />
                    Restart Simulation
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-6">
            <Button
                onClick={onToggleMute}
                variant="ghost"
                className={cn(
                    "h-14 w-14 rounded-full border transition-all duration-300",
                    isMuted
                        ? "border-red-500/50 bg-red-500/10 text-red-500 hover:text-red-400 hover:bg-red-500/20"
                        : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                )}
            >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>

            <Button
                onClick={onEndCall}
                className="h-14 px-8 rounded-full bg-red-500/90 hover:bg-red-500 text-white font-semibold shadow-lg shadow-red-900/20 transition-all hover:scale-105"
            >
                <PhoneOff className="w-5 h-5 mr-2" />
                End Call
            </Button>
        </div>
    )
}
