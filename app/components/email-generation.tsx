import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function EmailGeneration({ searchResults }: { searchResults: String }) {
  const [generatedEmail, setGeneratedEmail] = useState('')

  const generateEmail = async () => {
    // Implement actual email generation logic here
    const response = await fetch('/api/generate-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchResults }),
    });
    const data = await response.json();
    setGeneratedEmail(data.result);
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

