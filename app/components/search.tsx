import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

export function Search({ setSearchResults }: any) {
  const [query, setQuery] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Turn-off the actual api call to save credits if necessary
    const response = await fetch("/api/ask-grok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm: query, companyDesc: companyDesc }),
    });
    const data = await response.json();
    console.log(data);
    setSearchResults(data);
  };

  const handleCompanyDesc = async (e: any) => {
    e.preventDefault();
    setCompanyDesc(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder="Enter investor's name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Input
        type="text"
        placeholder="Enter company description"
        value={companyDesc}
        onChange={handleCompanyDesc}
        className="flex-grow"
      />
      <Button type="submit">
        <SearchIcon className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
