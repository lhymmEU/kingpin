import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Copy, Check } from 'lucide-react'

export function EmailGeneration({ searchResults }: { searchResults: String }) {
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const generateEmail = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchResults }),
      });
      const data = await response.json();
      setGeneratedEmail(data.result);
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary" />
            <span>Cold Email Draft</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={generateEmail}
              disabled={isGenerating || !searchResults}
              className="w-full"
            >
              {isGenerating ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  <Mail className="h-4 w-4" />
                </motion.div>
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              {isGenerating ? 'Generating...' : 'Generate Email'}
            </Button>
          </motion.div>

          {generatedEmail && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="relative">
                <Textarea
                  value={generatedEmail}
                  readOnly
                  className="h-64 pr-10"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

