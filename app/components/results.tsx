import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  Briefcase, 
  Twitter, 
  Linkedin, 
  Globe, 
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react'

interface SocialAccount {
  name: string;
  handle: string;
}

interface SearchResults {
  companyX: SocialAccount;
  personalX: SocialAccount;
  portfolioProjects: string[];
  tweets: string[];
}

function isValidSocialAccount(obj: any): obj is SocialAccount {
  return obj 
    && typeof obj === 'object'
    && typeof obj.name === 'string'
    && typeof obj.handle === 'string';
}

function isValidSearchResults(obj: any): obj is SearchResults {
  return obj 
    && typeof obj === 'object'
    && isValidSocialAccount(obj.companyX)
    && isValidSocialAccount(obj.personalX)
    && Array.isArray(obj.portfolioProjects)
    && obj.portfolioProjects.every((item: any) => typeof item === 'string')
    && Array.isArray(obj.tweets)
    && obj.tweets.every((item: any) => typeof item === 'string');
}

export function Results({ 
  searchResults, 
}: { 
  searchResults: string | { result: any };
}) {
  let results: SearchResults | null = null;
  let parseError = false;
  
  try {
    // Parse the input based on its type
    const parsedData = typeof searchResults === 'string' 
      ? JSON.parse(searchResults)
      : searchResults.result;
    
    // Validate the parsed data structure
    if (isValidSearchResults(parsedData)) {
      results = parsedData;
    } else {
      parseError = true;
      console.warn('Invalid data structure:', parsedData);
    }
  } catch (e) {
    parseError = true;
    console.warn('Parse error:', e);
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (parseError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <span>Raw Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
              {typeof searchResults === 'string' 
                ? searchResults 
                : JSON.stringify(searchResults, null, 2)}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Recent Tweets */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Twitter className="h-5 w-5 text-primary" />
              <span>Recent Tweets</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results?.tweets?.map((tweet: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 bg-muted rounded-lg"
              >
                <p className="text-sm">{tweet}</p>
              </motion.div>
            ))}
            {(!results?.tweets || results.tweets.length === 0) && (
              <div className="text-sm text-muted-foreground p-3">
                No tweets available
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Presence */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Social Presence</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results?.personalX && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                <span className="text-sm">Personal: @{results.personalX.handle}</span>
              </motion.div>
            )}
            {results?.companyX && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                <span className="text-sm">Company: @{results.companyX.handle}</span>
              </motion.div>
            )}
            {(!results?.personalX && !results?.companyX) && (
              <div className="text-sm text-muted-foreground p-3">
                No social accounts found
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Projects */}
      <motion.div variants={cardVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Portfolio Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {results?.portfolioProjects?.map((project: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary">{project}</Badge>
                </motion.div>
              ))}
              {(!results?.portfolioProjects || results.portfolioProjects.length === 0) && (
                <div className="text-sm text-muted-foreground">
                  No portfolio projects found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

