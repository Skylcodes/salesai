'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Loader2 } from 'lucide-react'

const experienceLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'experienced', label: 'Experienced' },
]

const salesTypes = [
  { value: 'saas', label: 'SaaS' },
  { value: 'agency-service', label: 'Agency/Service' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'local-business', label: 'Local business services' },
  { value: 'real-estate', label: 'Real estate' },
  { value: 'other', label: 'Other' },
]

const painPoints = [
  { value: 'opener', label: 'Getting past the opener' },
  { value: 'engagement', label: 'Keeping the prospect engaged' },
  { value: 'objections', label: 'Handling objections' },
  { value: 'confidence', label: 'Staying confident' },
  { value: 'closing', label: 'Closing the deal' },
  { value: 'other', label: 'Other' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [fullName, setFullName] = useState('')
  const [experienceLevel, setExperienceLevel] = useState<string>('')
  const [selectedSalesTypes, setSelectedSalesTypes] = useState<string[]>([])
  const [salesTypesOther, setSalesTypesOther] = useState('')
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([])
  const [painPointsOther, setPainPointsOther] = useState('')

  const toggleSalesType = (value: string) => {
    if (selectedSalesTypes.includes(value)) {
      setSelectedSalesTypes(selectedSalesTypes.filter((t) => t !== value))
      if (value === 'other') {
        setSalesTypesOther('')
      }
    } else {
      setSelectedSalesTypes([...selectedSalesTypes, value])
    }
  }

  const togglePainPoint = (value: string) => {
    if (selectedPainPoints.includes(value)) {
      setSelectedPainPoints(selectedPainPoints.filter((p) => p !== value))
      if (value === 'other') {
        setPainPointsOther('')
      }
    } else {
      setSelectedPainPoints([...selectedPainPoints, value])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name')
      return
    }

    if (!experienceLevel) {
      setError('Please select your experience level')
      return
    }

    if (selectedSalesTypes.length === 0) {
      setError('Please select at least one sales type')
      return
    }

    if (selectedSalesTypes.includes('other') && !salesTypesOther.trim()) {
      setError('Please specify the sales type')
      return
    }

    if (selectedPainPoints.length === 0) {
      setError('Please select at least one pain point')
      return
    }

    if (selectedPainPoints.includes('other') && !painPointsOther.trim()) {
      setError('Please specify the pain point')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          experienceLevel,
          salesTypes: selectedSalesTypes,
          salesTypesOther: selectedSalesTypes.includes('other') ? salesTypesOther.trim() : null,
          painPoints: selectedPainPoints,
          painPointsOther: selectedPainPoints.includes('other') ? painPointsOther.trim() : null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save onboarding data')
      }

      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#7AFF9B]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#4ade80]/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#7AFF9B 1px, transparent 1px), linear-gradient(90deg, #7AFF9B 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <Card className="relative z-10 w-full max-w-2xl border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7AFF9B] to-[#4ade80]">
              SalesAI
            </span>
            !
          </CardTitle>
          <CardDescription className="text-gray-400">
            Let's get to know you better to personalize your experience
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-800/50 rounded-md backdrop-blur-sm">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label className="text-gray-300">
                Experience Level <span className="text-red-400">*</span>
              </Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel} required>
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                  {experienceLevels.map((level) => (
                    <SelectItem
                      key={level.value}
                      value={level.value}
                      className="text-white focus:bg-[#7AFF9B]/20 focus:text-[#7AFF9B]"
                    >
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sales Types */}
            <div className="space-y-3">
              <Label className="text-gray-300">
                What type of sales are you practicing? <span className="text-red-400">*</span>
              </Label>
              <div className="space-y-2">
                {salesTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`sales-type-${type.value}`}
                      checked={selectedSalesTypes.includes(type.value)}
                      onCheckedChange={() => toggleSalesType(type.value)}
                      className="border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#7AFF9B] data-[state=checked]:to-[#4ade80] data-[state=checked]:border-[#7AFF9B]"
                    />
                    <Label
                      htmlFor={`sales-type-${type.value}`}
                      className="text-gray-300 font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSalesTypes.includes('other') && (
                <Input
                  placeholder="Please specify..."
                  value={salesTypesOther}
                  onChange={(e) => setSalesTypesOther(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                />
              )}
            </div>

            {/* Pain Points */}
            <div className="space-y-3">
              <Label className="text-gray-300">
                What do you struggle with the most? <span className="text-red-400">*</span>
              </Label>
              <div className="space-y-2">
                {painPoints.map((point) => (
                  <div key={point.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`pain-point-${point.value}`}
                      checked={selectedPainPoints.includes(point.value)}
                      onCheckedChange={() => togglePainPoint(point.value)}
                      className="border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#7AFF9B] data-[state=checked]:to-[#4ade80] data-[state=checked]:border-[#7AFF9B]"
                    />
                    <Label
                      htmlFor={`pain-point-${point.value}`}
                      className="text-gray-300 font-normal cursor-pointer"
                    >
                      {point.label}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedPainPoints.includes('other') && (
                <Input
                  placeholder="Please specify..."
                  value={painPointsOther}
                  onChange={(e) => setPainPointsOther(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-2 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

