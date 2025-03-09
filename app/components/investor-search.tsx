"use client";

import { useState } from "react";
import { Search } from "./search";
import { Results } from "./results";
import { motion } from "framer-motion";

export function InvestorSearch() {
  const [searchResults, setSearchResults] = useState<any>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Search */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-8">
              <Search setSearchResults={setSearchResults} />
            </div>
          </motion.div>

          {/* Right side - Results */}
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {searchResults ? (
              <Results searchResults={searchResults} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg">Enter an investor's name and your company details</p>
                  <p className="text-sm mt-2">Results will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 