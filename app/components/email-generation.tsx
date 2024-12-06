import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function EmailGeneration({ compiledData }: { compiledData: any }) {
  const [generatedEmail, setGeneratedEmail] = useState('')

  const generateEmail = () => {
    // Implement actual email generation logic here
    const mockEmail = `
Dear Investor,

I hope this email finds you well. I've been following your work and investments, particularly in ${compiledData.portfolioProjects.join(', ')}.

I noticed your recent tweet: "${compiledData.tweets[0]}", which aligns perfectly with our mission.

I'd love to discuss how we can collaborate. Are you available for a brief call next week?

Best regards,
[Your Name]
    `
    setGeneratedEmail(mockEmail)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Cold Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={generateEmail}>Generate Email</Button>
        {generatedEmail && (
          <Textarea value={generatedEmail} readOnly className="h-64" />
        )}
      </CardContent>
    </Card>
  )
}

