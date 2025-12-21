import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { fullName, experienceLevel, salesTypes, salesTypesOther, painPoints, painPointsOther } =
      body

    // Validation
    if (!fullName || !experienceLevel) {
      return NextResponse.json(
        { error: 'Full name and experience level are required' },
        { status: 400 }
      )
    }

    if (!salesTypes || salesTypes.length === 0) {
      return NextResponse.json({ error: 'At least one sales type is required' }, { status: 400 })
    }

    if (salesTypes.includes('other') && !salesTypesOther) {
      return NextResponse.json(
        { error: 'Please specify the sales type when selecting "Other"' },
        { status: 400 }
      )
    }

    if (!painPoints || painPoints.length === 0) {
      return NextResponse.json({ error: 'At least one pain point is required' }, { status: 400 })
    }

    if (painPoints.includes('other') && !painPointsOther) {
      return NextResponse.json(
        { error: 'Please specify the pain point when selecting "Other"' },
        { status: 400 }
      )
    }

    // Insert or update onboarding data
    const { error } = await supabase.from('user_onboarding').upsert(
      {
        user_id: user.id,
        full_name: fullName,
        experience_level: experienceLevel,
        sales_types: salesTypes,
        sales_types_other: salesTypesOther || null,
        pain_points: painPoints,
        pain_points_other: painPointsOther || null,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id',
      }
    )

    if (error) {
      console.error('Error saving onboarding data:', error)
      return NextResponse.json(
        { error: 'Failed to save onboarding data' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('user_onboarding')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is fine
      console.error('Error fetching onboarding data:', error)
      return NextResponse.json({ error: 'Failed to fetch onboarding data' }, { status: 500 })
    }

    return NextResponse.json({ data: data || null })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

