"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "./components/search";
import { Results } from "./components/results";
import { EmailGeneration } from "./components/email-generation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "./components/mode-toggle";
import { Sparkles, User, Mail, Info, Shield, Database, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "./components/header";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main Content - Horizontal Layout */}
      <main className="max-w-7xl mx-auto px-8 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side - Hero Content */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Know Your Investors
              <span className="block text-blue-600 dark:text-blue-400 mt-2">
                Before They Know You
              </span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Make informed decisions with background checks on potential investors.
              Protect your startup's future with valuable insights.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/home"
                className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Use App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
          
          {/* Right Side - Feature Cards */}
          <div className="lg:w-3/5">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
            >
              {/* Feature Card 1 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                  <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Deep Research</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Comprehensive analysis of investor backgrounds, track records, and reputation.
                </p>
              </motion.div>
              
              {/* Feature Card 2 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Due Diligence</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Dig into investor credentials and past investments to ensure alignment with your goals.
                </p>
              </motion.div>
              
              {/* Feature Card 3 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                  <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Data-Driven</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Make decisions based on concrete data and their track records.
                </p>
              </motion.div>
              
              {/* Feature Card 4 */}
              <motion.div 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">Email Generation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Automatically generate outreach emails based on research findings.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
