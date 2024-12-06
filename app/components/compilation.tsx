import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function Compilation({ compiledData }: { compiledData: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Compiled Portfolio Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {compiledData.portfolioProjects.map((project: any, index: any) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compiled Tweets</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {compiledData.tweets.map((tweet: any, index: any) => (
              <li key={index}>{tweet}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

