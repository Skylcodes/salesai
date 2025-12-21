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
import { Play, Loader2 } from 'lucide-react'

const prospectPersonalities = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'short-tempered', label: 'Short-tempered' },
  { value: 'curious', label: 'Curious' },
  { value: 'skeptical', label: 'Skeptical' },
]

const toneOptions = [
  { value: 'casual', label: 'Casual' },
  { value: 'professional', label: 'Professional' },
  { value: 'high-energy', label: 'High-energy' },
]

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const objectionsLevels = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const specificObjections = [
  { value: 'price', label: 'Price' },
  { value: 'timing', label: 'Timing' },
  { value: 'trust', label: 'Trust' },
  { value: 'authority', label: 'Authority' },
  { value: 'other', label: 'Other' },
]

const practiceAreas = [
  { value: 'rapport', label: 'Rapport' },
  { value: 'discovery', label: 'Discovery' },
  { value: 'objection-handling', label: 'Objection Handling' },
  { value: 'closing', label: 'Closing' },
  { value: 'pitching', label: 'Pitching' },
]

export default function SimulationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Product details
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [priceRange, setPriceRange] = useState('')

  // Prospect persona
  const [prospectRole, setProspectRole] = useState('')
  const [prospectIndustry, setProspectIndustry] = useState('')
  const [prospectPersonality, setProspectPersonality] = useState<string>('')
  const [prospectTone, setProspectTone] = useState<string>('')
  const [prospectDetails, setProspectDetails] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // Sales difficulty
  const [difficulty, setDifficulty] = useState<string>('')
  const [objectionsLevel, setObjectionsLevel] = useState<string>('')
  const [selectedObjections, setSelectedObjections] = useState<string[]>([])

  // Call goals
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [callObjectives, setCallObjectives] = useState<string[]>([])
  const [otherObjective, setOtherObjective] = useState('')
  const [scenario, setScenario] = useState('cold-call')
  const [selectedPracticeAreas, setSelectedPracticeAreas] = useState<string[]>([])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      setError('Currently only .txt files are supported for instant parsing. For PDFs, please copy-paste the text.')
      return
    }

    setIsUploading(true)
    try {
      const text = await file.text()
      setProspectDetails(text)
    } catch (err) {
      setError('Failed to read file')
    } finally {
      setIsUploading(false)
    }
  }

  const toggleObjection = (value: string) => {
    if (selectedObjections.includes(value)) {
      setSelectedObjections(selectedObjections.filter((o) => o !== value))
    } else {
      setSelectedObjections([...selectedObjections, value])
    }
  }

  const togglePracticeArea = (value: string) => {
    if (selectedPracticeAreas.includes(value)) {
      setSelectedPracticeAreas(selectedPracticeAreas.filter((p) => p !== value))
    } else {
      setSelectedPracticeAreas([...selectedPracticeAreas, value])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validation
    if (!productName.trim()) {
      setError('Please enter a product name')
      return
    }

    const hasDetails = prospectDetails.trim().length > 0

    if (!hasDetails && !prospectPersonality) {
      setError('Please select a prospect personality or provide prospect details')
      return
    }

    if (!hasDetails && !prospectTone) {
      setError('Please select a tone preference or provide prospect details')
      return
    }

    if (!difficulty) {
      setError('Please select a difficulty level')
      return
    }

    if (!objectionsLevel) {
      setError('Please select an objections level')
      return
    }

    if (selectedPracticeAreas.length === 0) {
      setError('Please select at least one practice area')
      return
    }

    if (callObjectives.length === 0) {
      setError('Please select at least one primary objective')
      return
    }

    setLoading(true)

    try {
      // Send dedicated fields to the backend
      // goals field now only contains additionalInfo (Context)

      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: productName.trim(),
          productDescription: productDescription.trim() || null,
          productPriceRange: priceRange.trim() || null,
          prospectRole: prospectRole.trim() || null,
          prospectIndustry: prospectIndustry.trim() || null,
          prospectPersonality: prospectPersonality || 'neutral',
          prospectTone: prospectTone || 'professional',
          prospectDetails: prospectDetails.trim() || null, // New Separate Field
          difficulty,
          objectionsLevel,
          objectionsList: selectedObjections,
          goals: additionalInfo.trim(), // additionalInfo is now just sent as 'goals'
          scenario, // Separate Field
          callObjectives, // Separate Field (Array of strings)
          practiceAreas: selectedPracticeAreas,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to save simulation settings')
      }

      // Redirect to start page
      router.push('/dashboard/simulation/start')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Start Simulation</h1>
        <p className="text-gray-400 mt-2">Configure your sales call simulation parameters.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Product Details */}
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Product Details</CardTitle>
              <CardDescription className="text-gray-400">
                Tell us about the product you're selling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-gray-300">
                  Product Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="productName"
                  type="text"
                  placeholder="e.g., CRM Software"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription" className="text-gray-300">
                  Product Description
                </Label>
                <textarea
                  id="productDescription"
                  placeholder="Describe your product..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7AFF9B]/50 focus:ring-1 focus:ring-[#7AFF9B]/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceRange" className="text-gray-300">Price Range</Label>
                <Input
                  id="priceRange"
                  type="text"
                  placeholder="e.g., $99-$299/month"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Prospect Persona */}
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Prospect Persona</CardTitle>
              <CardDescription className="text-gray-400">
                Define your ideal customer profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prospectDetails" className="text-gray-300">
                  Prospect Details (Free Write)
                </Label>
                <div className="flex flex-col space-y-2">
                  <textarea
                    id="prospectDetails"
                    placeholder="Enter details about the business, client, or specific scenario... This overrides personality/tone preferences."
                    value={prospectDetails}
                    onChange={(e) => setProspectDetails(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7AFF9B]/50 focus:ring-1 focus:ring-[#7AFF9B]/20 resize-none font-mono text-sm"
                  />
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="file-upload" className="block text-xs text-gray-400 mb-1">
                        Or upload a .txt file
                      </Label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-gray-400
                          file:mr-4 file:py-1 file:px-2
                          file:rounded-full file:border-0
                          file:text-xs file:font-semibold
                          file:bg-[#7AFF9B]/10 file:text-[#7AFF9B]
                          hover:file:bg-[#7AFF9B]/20
                          cursor-pointer"
                      />
                    </div>
                    {isUploading && <Loader2 className="h-4 w-4 animate-spin text-[#7AFF9B]" />}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prospectRole" className="text-gray-300">Role/Title</Label>
                  <Input
                    id="prospectRole"
                    type="text"
                    placeholder="e.g., Sales Manager, CEO"
                    value={prospectRole}
                    onChange={(e) => setProspectRole(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prospectIndustry" className="text-gray-300">Industry</Label>
                  <Input
                    id="prospectIndustry"
                    type="text"
                    placeholder="e.g., Technology, Healthcare"
                    value={prospectIndustry}
                    onChange={(e) => setProspectIndustry(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">
                    Personality {!prospectDetails && <span className="text-red-400">*</span>}
                    {prospectDetails && <span className="text-xs text-gray-500 ml-1">(Optional)</span>}
                  </Label>
                  <Select value={prospectPersonality} onValueChange={setProspectPersonality}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                      <SelectValue placeholder="Select personality" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                      {prospectPersonalities.map((personality) => (
                        <SelectItem
                          key={personality.value}
                          value={personality.value}
                          className="text-white focus:bg-[#7AFF9B]/20 focus:text-[#7AFF9B]"
                        >
                          {personality.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">
                    Tone Preference {!prospectDetails && <span className="text-red-400">*</span>}
                    {prospectDetails && <span className="text-xs text-gray-500 ml-1">(Optional)</span>}
                  </Label>
                  <Select value={prospectTone} onValueChange={setProspectTone}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                      {toneOptions.map((tone) => (
                        <SelectItem
                          key={tone.value}
                          value={tone.value}
                          className="text-white focus:bg-[#7AFF9B]/20 focus:text-[#7AFF9B]"
                        >
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Difficulty */}
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Sales Difficulty</CardTitle>
              <CardDescription className="text-gray-400">
                Set the challenge level for your practice session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">
                  Overall Difficulty <span className="text-red-400">*</span>
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty} required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                    {difficultyOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white focus:bg-[#7AFF9B]/20 focus:text-[#7AFF9B]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">
                  Amount of Objections <span className="text-red-400">*</span>
                </Label>
                <Select value={objectionsLevel} onValueChange={setObjectionsLevel} required>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                    <SelectValue placeholder="Select objections level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                    {objectionsLevels.map((level) => (
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

              <div className="space-y-3">
                <Label className="text-gray-300">Specific Objections</Label>
                <div className="space-y-2">
                  {specificObjections.map((objection) => (
                    <div key={objection.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`objection-${objection.value}`}
                        checked={selectedObjections.includes(objection.value)}
                        onCheckedChange={() => toggleObjection(objection.value)}
                        className="border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#7AFF9B] data-[state=checked]:to-[#4ade80] data-[state=checked]:border-[#7AFF9B]"
                      />
                      <Label
                        htmlFor={`objection-${objection.value}`}
                        className="text-gray-300 font-normal cursor-pointer"
                      >
                        {objection.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Context */}
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Call Scenario</CardTitle>
              <CardDescription className="text-gray-400">
                How did this interaction start?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-gray-300">
                  Scenario Type <span className="text-red-400">*</span>
                </Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-[#7AFF9B]/50 focus:ring-[#7AFF9B]/20">
                    <SelectValue placeholder="Select a scenario" />
                  </SelectTrigger>
                  <SelectContent className="bg-gradient-to-b from-white/[0.15] to-white/[0.05] border-white/10 backdrop-blur-xl">
                    <SelectItem value="cold-call" className="text-white">Cold Call (Outbound)</SelectItem>
                    <SelectItem value="inbound-lead" className="text-white">Inbound Lead (They requested info)</SelectItem>
                    <SelectItem value="scheduled-meeting" className="text-white">Scheduled Meeting (They booked a time)</SelectItem>
                    <SelectItem value="follow-up" className="text-white">Follow-up Call (Previous contact)</SelectItem>
                    <SelectItem value="referral" className="text-white">Referral (Friend sent them)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Call Goals & Objectives */}
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Call Goals</CardTitle>
              <CardDescription className="text-gray-400">
                Define the targets for this simulation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Call Objectives (New) */}
              <div className="space-y-3">
                <Label className="text-gray-300">
                  Primary Objective(s) <span className="text-red-400">*</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'book-meeting', label: 'Book a Meeting / Next Step' },
                    { id: 'close-sale', label: 'Close the Sale (Payment)' },
                    { id: 'qualify', label: 'Qualify the Lead' },
                    { id: 'discovery', label: 'Discovery / Information Gathering' },
                    { id: 'gatekeeper', label: 'Get Past Gatekeeper' }
                  ].map((obj) => (
                    <div key={obj.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`obj-${obj.id}`}
                        checked={callObjectives.includes(obj.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setCallObjectives([...callObjectives, obj.id])
                          else setCallObjectives(callObjectives.filter(id => id !== obj.id))
                        }}
                        className="border-white/20 data-[state=checked]:bg-[#7AFF9B] data-[state=checked]:border-[#7AFF9B]"
                      />
                      <Label htmlFor={`obj-${obj.id}`} className="text-gray-300 font-normal cursor-pointer text-sm">
                        {obj.label}
                      </Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="obj-other"
                      checked={callObjectives.includes('other')}
                      onCheckedChange={(checked) => {
                        if (checked) setCallObjectives([...callObjectives, 'other'])
                        else setCallObjectives(callObjectives.filter(id => id !== 'other'))
                      }}
                      className="border-white/20 data-[state=checked]:bg-[#7AFF9B] data-[state=checked]:border-[#7AFF9B]"
                    />
                    <Label htmlFor="obj-other" className="text-gray-300 font-normal cursor-pointer text-sm">
                      Other
                    </Label>
                  </div>
                </div>

                {/* Other Input */}
                {callObjectives.includes('other') && (
                  <Input
                    placeholder="Specify your goal..."
                    value={otherObjective}
                    onChange={(e) => setOtherObjective(e.target.value)}
                    className="bg-white/5 border-white/10 text-white mt-2"
                  />
                )}
              </div>

              {/* Additional Context (Previously 'goals') */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <Label htmlFor="additionalInfo" className="text-gray-300">
                  Prospect Context (Additional Info)
                </Label>
                <p className="text-xs text-gray-500 mb-2">
                  Information the AI prospect ALREADY KNOWS (e.g. "We met at a conference").
                </p>
                <textarea
                  id="additionalInfo"
                  placeholder="e.g. 'I sent you an email yesterday' or 'You are already using a competitor'..."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#7AFF9B]/50 focus:ring-1 focus:ring-[#7AFF9B]/20 resize-none"
                />
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <Label className="text-gray-300">
                  Focus Areas (For Grading) <span className="text-red-400">*</span>
                </Label>
                <div className="space-y-2">
                  {practiceAreas.map((area) => (
                    <div key={area.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`practice-${area.value}`}
                        checked={selectedPracticeAreas.includes(area.value)}
                        onCheckedChange={() => togglePracticeArea(area.value)}
                        className="border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#7AFF9B] data-[state=checked]:to-[#4ade80] data-[state=checked]:border-[#7AFF9B]"
                      />
                      <Label
                        htmlFor={`practice-${area.value}`}
                        className="text-gray-300 font-normal cursor-pointer"
                      >
                        {area.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-800/50 rounded-md backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#7AFF9B] to-[#4ade80] text-black font-bold hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Simulation
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
