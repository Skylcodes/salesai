
import { useRef, useEffect } from 'react'
import { ConversationItem } from '@/hooks/use-realtime-connection'
import { cn } from '@/lib/utils'

interface LiveTranscriptProps {
    items: ConversationItem[]
}

export function LiveTranscript({ items }: LiveTranscriptProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [items])

    return (
        <div className="flex-1 overflow-hidden relative rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm">
            <div
                ref={scrollRef}
                className="absolute inset-0 overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
                {items.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-2">
                        <p>Waiting for conversation to start...</p>
                    </div>
                )}

                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex w-full",
                            item.role === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                item.role === 'user'
                                    ? "bg-[#7AFF9B] text-black rounded-tr-none"
                                    : "bg-white/10 text-gray-100 rounded-tl-none border border-white/5",
                                !item.isFinal && "opacity-70"
                            )}
                        >
                            <p className="whitespace-pre-wrap">{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
