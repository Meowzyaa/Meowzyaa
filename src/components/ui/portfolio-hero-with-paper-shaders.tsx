"use client"

import { Dithering } from "@paper-design/shaders-react"
import { useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ResumePage() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col md:flex-row" id="resume-page">
      <div
        className={`w-full md:w-1/2 p-8 font-mono relative z-10 flex flex-col justify-between transition-colors duration-500 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
      >
        {/* Theme toggle button in top right of left panel */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-8 right-8 p-2 rounded-full transition-colors ${
            isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
          }`}
          aria-label="Toggle theme"
          id="theme-toggle"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-lg font-normal mb-8">Azamat.cv</h1>
          <div className="mb-8">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase">Shaimardan Azamat</h2>
            <h3 className="text-lg font-normal opacity-70">DEVELOPER</h3>
          </div>
        </div>

        {/* Experience Section / Middle Content */}
        <div className="mb-12 space-y-4">
          <div className="border-l-2 border-current pl-4 py-2">
            <p className="text-xl">NIS Almaty 11th grade</p>
            <p className="text-sm opacity-60 mt-1">Current Education & Focus</p>
          </div>
          
          <div className="space-y-2 opacity-80">
            <div className="flex justify-between border-b border-current/20 pb-1">
              <span>Tutoring</span>
              <span>Chemistry, Physics, Mathematics</span>
            </div>
            <div className="flex justify-between border-b border-current/20 pb-1">
              <span>Composing</span>
              <span>Post-rock</span>
            </div>
            <div className="flex justify-between border-b border-current/20 pb-1">
              <span>Machine learning</span>
              <span>in progress</span>
            </div>
          </div>
        </div>

        {/* Footer Links Section */}
        <div className="mt-auto pt-8">
          <div className="flex flex-wrap gap-6 text-lg font-mono">
            <span className="font-bold">Links</span>
            <a href="https://github.com/Meowzyaa" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">GitHub</a>
            <a href="https://artists.landr.com/Meowzya" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">Artist</a>
            <a href="mailto:meowzya@proton.me" className="hover:underline transition-all">Email</a>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
        <Dithering
          style={{ height: "100%", width: "100%" }}
          colorBack={isDarkMode ? "hsl(0, 0%, 0%)" : "hsl(0, 0%, 100%)"}
          colorFront={isDarkMode ? "hsl(210, 100%, 50%)" : "hsl(25, 100%, 50%)"}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.1}
        />
        
        {/* Overlay for mobile to make it feel more integrated */}
        <div className={`absolute inset-0 pointer-events-none md:hidden ${isDarkMode ? "bg-gradient-to-t from-black to-transparent" : "bg-gradient-to-t from-white to-transparent"}`} />
      </div>
    </div>
  )
}
