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
    const {
      productName,
      productDescription,
      productPriceRange,
      prospectRole,
      prospectIndustry,
      prospectPersonality,
      prospectTone,
      prospectDetails, // New field
      difficulty,
      objectionsLevel,
      objectionsList,
      goals, // This will now serve as user-provided 'Context' (additionalInfo)
      scenario, // New field (unpacked)
      callObjectives, // New field (unpacked)
      practiceAreas,
    } = body

    // Validation
    if (!productName) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 })
    }

    if (!prospectPersonality && !prospectDetails) {
      return NextResponse.json({ error: 'Prospect personality or details required' }, { status: 400 })
    }
    // We relax validation if details are provided, matching frontend logic

    if (!difficulty) {
      return NextResponse.json({ error: 'Difficulty is required' }, { status: 400 })
    }

    if (!objectionsLevel) {
      return NextResponse.json({ error: 'Objections level is required' }, { status: 400 })
    }

    if (!practiceAreas || practiceAreas.length === 0) {
      return NextResponse.json(
        { error: 'At least one practice area is required' },
        { status: 400 }
      )
    }

    // Insert simulation settings
    const { error } = await supabase.from('simulation_settings').insert({
      user_id: user.id,
      product_name: productName,
      product_description: productDescription || null,
      product_price_range: productPriceRange || null,
      prospect_role: prospectRole || null,
      prospect_industry: prospectIndustry || null,
      prospect_personality: prospectPersonality || 'neutral',
      prospect_tone: prospectTone || 'professional',
      prospect_details: prospectDetails || null, // dedicated column
      difficulty,
      objections_level: objectionsLevel,
      objections_list: objectionsList || [],
      goals: goals || null, // additionalInfo
      scenario: scenario || 'cold-call', // dedicated column
      call_objectives: callObjectives || [], // dedicated column
      practice_areas: practiceAreas,
    })

    if (error) {
      console.error('Error saving simulation settings:', error)
      return NextResponse.json(
        { error: 'Failed to save simulation settings' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

