"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

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

    return (
        <div className="relative max-w-md">
            <form onSubmit={handleSearch}>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                    <Input
                        type="text"
                        placeholder="Bạn muốn nghe gì?"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`pl-10 pr-10 bg-input border-border text-foreground placeholder:text-muted transition-all duration-200 ${isFocused ? "ring-2 ring-primary border-primary" : ""
                            }`}
                    />
                    {searchQuery && (
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                            onClick={clearSearch}
                        >
                            <X className="w-4 h-4 text-muted" />
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
