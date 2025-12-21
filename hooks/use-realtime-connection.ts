
import { useEffect, useRef, useState, useCallback } from 'react'

export type ConversationItem = {
    id: string
    role: 'user' | 'assistant' | 'system'
    text: string
    isFinal: boolean
    timestamp: string
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error' | 'ended'

interface UseRealtimeConnectionProps {
    prompt: string
    onDisconnect?: () => void
}

export function useRealtimeConnection({ prompt, onDisconnect }: UseRealtimeConnectionProps) {
    const [status, setStatus] = useState<ConnectionStatus>('disconnected')
    const [items, setItems] = useState<ConversationItem[]>([])
    const [isMuted, setIsMuted] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
    const dataChannelRef = useRef<RTCDataChannel | null>(null)
    const audioElRef = useRef<HTMLAudioElement | null>(null)
    const localStreamRef = useRef<MediaStream | null>(null)

    const isConnectingRef = useRef(false)

    // Helper to append or update the last message if it's the same ID (for streaming)
    const updateTranscript = useCallback((role: 'user' | 'assistant', text: string, isFinal: boolean, itemId?: string) => {
        setItems(prev => {
            const last = prev[prev.length - 1]

            // If we're updating an existing streaming message
            if (last && last.role === role && !last.isFinal && (!itemId || last.id === itemId)) {
                return [
                    ...prev.slice(0, -1),
                    { ...last, text: isFinal ? text : (role === 'user' ? text : text), isFinal } // For user, we might overwrite. For assistant, we append usually, but here we'll just handle full text updates or appends depending on event.
                    // Note: OpenAI events send deltas for assistant, but full text updates for user transcripts usually?
                    // We'll adjust based on event handling logic below.
                ]
            }

            // Start a new message
            return [...prev, {
                id: itemId || crypto.randomUUID(),
                role,
                text,
                isFinal,
                timestamp: new Date().toISOString()
            }]
        })
    }, [])

    const connect = useCallback(async () => {
        if (status === 'connected' || status === 'connecting' || isConnectingRef.current) return

        try {
            isConnectingRef.current = true
            setStatus('connecting')
            setError(null)

            // 1. Get ephemeral token
            const tokenRes = await fetch('/api/simulation/session', { method: 'POST' })
            if (!tokenRes.ok) throw new Error('Failed to get session token')
            const data = await tokenRes.json()
            const ephemeralKey = data.client_secret.value

            // 2. Init PC
            const pc = new RTCPeerConnection()
            peerConnectionRef.current = pc

            // Playback audio
            const audioEl = document.createElement('audio')
            audioEl.autoplay = true
            audioElRef.current = audioEl

            pc.ontrack = (e) => {
                audioEl.srcObject = e.streams[0]
            }

            // 3. Add Microphone
            const ms = await navigator.mediaDevices.getUserMedia({ audio: true })
            localStreamRef.current = ms
            ms.getTracks().forEach(track => pc.addTrack(track, ms))

            // 4. Data Channel for events
            const dc = pc.createDataChannel('oai-events')
            dataChannelRef.current = dc

            dc.onopen = () => {
                // Send initial instructions once channel is open
                const event = {
                    type: 'session.update',
                    session: {
                        modalities: ['text', 'audio'],
                        instructions: prompt,
                        input_audio_transcription: {
                            model: 'whisper-1'
                        }
                    }
                }
                dc.send(JSON.stringify(event))

                // Trigger generic "hello" or just let it start
                // Usually we might want to say 'response.create' to trigger AI, 
                // but if the prompt says "You are a prospect... wait for user" or similar, we might wait.
                // However, usually better to force a start or wait for VAD.
                // Let's rely on VAD for now unless prompt implies AI speaks first.
                // We'll send a 'response.create' just in case to kick things off if needed, 
                // but arguably we should wait for user to say "Hello".
                // Let's just set status to connected.
                setStatus('connected')
                isConnectingRef.current = false
            }

            dc.onmessage = (e) => {
                try {
                    const event = JSON.parse(e.data)
                    handleServerEvent(event)
                } catch (err) {
                    console.error('Error parsing event:', err)
                }
            }

            // 5. SDP Offer/Answer flow
            const offer = await pc.createOffer()
            await pc.setLocalDescription(offer)

            const baseUrl = 'https://api.openai.com/v1/realtime'
            const model = 'gpt-4o-realtime-preview-2024-12-17'
            const sdpRes = await fetch(`${baseUrl}?model=${model}`, {
                method: 'POST',
                body: offer.sdp,
                headers: {
                    Authorization: `Bearer ${ephemeralKey}`,
                    'Content-Type': 'application/sdp',
                },
            })

            if (!sdpRes.ok) throw new Error('Failed to handshake with OpenAI')

            const answerSdp = await sdpRes.text()

            // Check if connection was closed during the fetch (e.g. unmount)
            if (pc.signalingState !== 'closed') {
                await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp })
            }

        } catch (err) {
            console.error('Connection failed:', err)
            setError(err instanceof Error ? err.message : 'Connection failed')
            setStatus('error')
            isConnectingRef.current = false
            cleanup()
        }
    }, [prompt, status])

    // Handle events from OpenAI
    const handleServerEvent = (event: any) => {
        switch (event.type) {
            case 'response.audio_transcript.delta':
                // Assistant talking (streaming)
                setItems(prev => {
                    const existingIndex = prev.findIndex(item => item.id === event.item_id)

                    if (existingIndex !== -1) {
                        const updatedItems = [...prev]
                        const existingItem = updatedItems[existingIndex]
                        updatedItems[existingIndex] = {
                            ...existingItem,
                            text: existingItem.text + event.delta
                        }
                        return updatedItems
                    }

                    // New message
                    return [...prev, {
                        id: event.item_id,
                        role: 'assistant',
                        text: event.delta,
                        isFinal: false,
                        timestamp: new Date().toISOString()
                    }]
                })
                break

            case 'response.audio_transcript.done':
                setItems(prev => {
                    const existingIndex = prev.findIndex(item => item.id === event.item_id)
                    if (existingIndex !== -1) {
                        const updatedItems = [...prev]
                        updatedItems[existingIndex] = { ...updatedItems[existingIndex], isFinal: true }
                        return updatedItems
                    }
                    return prev
                })
                break

            case 'conversation.item.input_audio_transcription.completed':
                // User finished talking (final transcript)
                const text = event.transcript
                if (text) {
                    setItems(prev => {
                        // Prevent duplicates
                        if (prev.some(item => item.id === event.item_id)) {
                            return prev
                        }
                        return [...prev, {
                            id: event.item_id,
                            role: 'user',
                            text,
                            isFinal: true,
                            timestamp: new Date().toISOString()
                        }]
                    })
                }
                break

            // Check for errors
            case 'error':
                console.error('OpenAI Realtime Error:', event)
                break
        }
    }

    const disconnect = useCallback(() => {
        cleanup()
        setStatus('ended')
        if (onDisconnect) onDisconnect()
    }, [onDisconnect])

    const cleanup = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close()
            peerConnectionRef.current = null
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach(t => t.stop())
            localStreamRef.current = null
        }
        if (audioElRef.current) {
            audioElRef.current.srcObject = null
            audioElRef.current = null
        }
    }

    const toggleMute = useCallback(() => {
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !isMuted // Logic: if isMuted is currently true (mic off), we want enabled=true. if isMuted false, enabled=false.
            })
            setIsMuted(!isMuted)
        }
    }, [isMuted])

    // Cleanup on unmount
    useEffect(() => {
        return () => cleanup()
    }, [])

    return {
        status,
        items,
        connect,
        disconnect,
        isMuted,
        toggleMute,
        error
    }
}
