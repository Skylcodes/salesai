
import { NextResponse } from 'next/server'

export async function POST() {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
        }

        const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-realtime-preview-2024-12-17',
                voice: 'verse',
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            console.error('OpenAI Session Error:', error)
            return NextResponse.json({ error: 'Failed to create OpenAI session' }, { status: 500 })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Session creation error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
