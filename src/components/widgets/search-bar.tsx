"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, X, Mic } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

interface SearchBarProps {
    onSearch?: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
    const [isFocused, setIsFocused] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        onSearch?.(query)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const clearSearch = () => {
        setSearchQuery("")
        onSearch?.("")
        router.push("/search")
    }

    const handleVoiceSearch = () => {
        // Voice search functionality would go here
        console.log("Voice search activated")
    }

    return (
        <div className="relative max-w-md w-full">
            <form onSubmit={handleSearch}>
                <motion.div
                    className="relative group transition-all duration-200"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Search Input Container */}
                    <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-full transition-all duration-200 ${isFocused ? "bg-white/10 border-white/20 shadow-lg" : "hover:bg-white/8 hover:border-white/15"
                        }`}>
                        {/* Search Icon */}
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 transition-colors duration-200 group-hover:text-white/80" />

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="Bạn muốn nghe gì?"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full h-10 pl-12 pr-20 bg-transparent text-white placeholder:text-white/60 focus:outline-none text-sm font-medium"
                        />

                        {/* Action Buttons */}
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            {/* Voice Search Button */}
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="w-8 h-8 rounded-full btn-smooth hover:bg-white/10"
                                onClick={handleVoiceSearch}
                            >
                                <Mic className="w-4 h-4 text-white/60 hover:text-white/80" />
                            </Button>

                            {/* Clear Button */}
                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="w-8 h-8 rounded-full btn-smooth hover:bg-white/10"
                                        onClick={clearSearch}
                                    >
                                        <X className="w-4 h-4 text-white/60 hover:text-white/80" />
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Focus Ring */}
                    {isFocused && (
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </motion.div>
            </form>
        </div>
    )
}
