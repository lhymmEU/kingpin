import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Search({ setSearchResults }: any) {
  const [query, setQuery] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask-grok", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchTerm: query, companyDesc: companyDesc }),
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanyDesc = async (e: any) => {
    e.preventDefault();
    setCompanyDesc(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Find Your Next Investor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter investor's name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 bg-muted p-3 rounded-lg">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tell us about your company"
                value={companyDesc}
                onChange={handleCompanyDesc}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-end"
          >
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !query.trim() || !companyDesc.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                </motion.div>
              ) : (
                <SearchIcon className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}
