"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "./components/search";
import { Results } from "./components/results";
import { EmailGeneration } from "./components/email-generation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "./components/mode-toggle";
import { Sparkles, User, Mail, Info } from "lucide-react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<String>("");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">KingPin</h1>
        </div>
        <ModeToggle />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <Search setSearchResults={setSearchResults} />
        </div>

        {searchResults && (
          <Tabs defaultValue="analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Investor Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Draft</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center space-x-2">
                <Info className="h-4 w-4" />
                <span>Key Insights</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="analysis">
                <Results searchResults={searchResults} />
              </TabsContent>

              <TabsContent value="email">
                <EmailGeneration searchResults={searchResults} />
              </TabsContent>

              <TabsContent value="insights">
                <div className="bg-card rounded-lg p-6 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4">Investment Insights</h3>
                  {/* Add your insights component here */}
                  <p className="text-muted-foreground">
                    Detailed analysis and key takeaways from the investor's background will appear here.
                  </p>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        )}
      </motion.div>
    </div>
  );
}
