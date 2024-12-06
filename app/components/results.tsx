import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

// Define interfaces for the data structures
interface SearchResult {
  companyX?: {
    name: string;
    handle: string;
  };
  personalX?: {
    name: string;
    handle: string;
  };
  portfolioProjects: string[];
  tweets: string[];
}

interface CompiledData {
  portfolioProjects: string[];
  tweets: string[];
}

// Add types to the component props
export function Results({ 
  searchResults, 
  setCompiledData 
}: { 
  searchResults: SearchResult;
  setCompiledData: React.Dispatch<React.SetStateAction<CompiledData>>;
}) {
  const addToCompilation = (type: keyof CompiledData, item: string) => {
    setCompiledData((prev) => ({
      ...prev,
      [type]: [...prev[type], item]
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Company X Account</CardTitle>
        </CardHeader>
        <CardContent>
          {searchResults.companyX && (
            <div>
              <p>{searchResults.companyX.name}</p>
              <p>{searchResults.companyX.handle}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal X Account</CardTitle>
        </CardHeader>
        <CardContent>
          {searchResults.personalX && (
            <div>
              <p>{searchResults.personalX.name}</p>
              <p>{searchResults.personalX.handle}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {searchResults.portfolioProjects.map((project, index) => (
              <li key={index} className="flex justify-between items-center">
                {project}
                <Button size="sm" variant="ghost" onClick={() => addToCompilation('portfolioProjects', project)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tweets</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {searchResults.tweets.map((tweet, index) => (
              <li key={index} className="flex justify-between items-center">
                {tweet}
                <Button size="sm" variant="ghost" onClick={() => addToCompilation('tweets', tweet)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

