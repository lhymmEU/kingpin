import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Add types to the component props
export function Results({ 
  searchResults, 
}: { 
  searchResults: String;
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <p>{JSON.stringify(searchResults)}</p>
    </div>
  )
}

