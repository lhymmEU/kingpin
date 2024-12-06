"use client";

import { useState } from "react";
import { Search } from "./components/search";
import { Results } from "./components/results";
import { Compilation } from "./components/compilation";
import { EmailGeneration } from "./components/email-generation";

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

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult>({
    companyX: undefined,
    personalX: undefined,
    portfolioProjects: [],
    tweets: [],
  });

  const [compiledData, setCompiledData] = useState<CompiledData>({
    portfolioProjects: [],
    tweets: [],
  });

  return (
    <div className="space-y-8">
      <Search setSearchResults={setSearchResults} />
      <Results
        searchResults={searchResults}
        setCompiledData={setCompiledData}
      />
      <Compilation compiledData={compiledData} />
      <EmailGeneration compiledData={compiledData} />
    </div>
  );
}
