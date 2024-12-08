"use client";

import { useState } from "react";
import { Search } from "./components/search";
import { Results } from "./components/results";
import { EmailGeneration } from "./components/email-generation";

export default function Home() {
  const [searchResults, setSearchResults] = useState<String>("");

  return (
    <div className="space-y-8">
      <Search setSearchResults={setSearchResults} />
      <Results
        searchResults={searchResults}
      />
      <EmailGeneration searchResults={searchResults} />
    </div>
  );
}
