import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export function Search({ setSearchResults }: any) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e: any) => {
    e.preventDefault();
    // Implement actual search logic here
    const mockResults = {
      companyX: { name: "TechCorp", handle: "@techcorp" },
      personalX: { name: "John Doe", handle: "@johndoe" },
      portfolioProjects: ["Project A", "Project B", "Project C"],
      tweets: ["Tweet 1", "Tweet 2", "Tweet 3"],
    };
    setSearchResults(mockResults);
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter company or person name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
