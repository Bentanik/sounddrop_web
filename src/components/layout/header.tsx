'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { BellIcon, ChevronLeftIcon, ChevronRightIcon, SettingsIcon, UserIcon } from 'lucide-react'
import { SearchBar } from '@/components/widgets'
import { useRouter } from 'next/navigation'
import { useAuthPopup } from '@/hooks/use-popup-store'

export default function Header() {
    const router = useRouter()
    const { openAuthPopup } = useAuthPopup()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div className="h-[80px] px-6 flex items-center justify-between border-b border-sidebar-border">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                        <div className="w-8 h-8 rounded-full bg-white/5" />
                    </div>
                    <div className="w-64 h-10 bg-white/5 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-16 h-8 bg-white/5 rounded" />
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="w-8 h-8 rounded-full bg-white/5" />
                    <div className="w-8 h-8 rounded-full bg-white" />
                </div>
            </div>
        )
    }

    return (
        <div className="h-[80px] px-6 flex items-center justify-between border-b border-sidebar-border">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 rounded-full btn-smooth hover:bg-white/5"
                        onClick={() => router.back()}
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 rounded-full btn-smooth hover:bg-white/5"
                        onClick={() => router.forward()}
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <SearchBar />
                </div>
            </div>

            {/* User Profile and Controls */}
            <div className="flex items-center gap-3">
                <Button variant="ghost" className="text-foreground btn-smooth hover:bg-white/5">
                    Nâng cấp
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-full btn-smooth hover:bg-white/5"
                    onClick={() => { }}
                >
                    <BellIcon className="w-4 h-4" />
                </Button>
                <Button
                    size="icon"
                    variant="ghost"
                    className="w-8 h-8 rounded-full btn-smooth hover:bg-white/5"
                    onClick={() => { }}
                >
                    <SettingsIcon className="w-4 h-4" />
                </Button>
                <Button
                    size="icon"
                    className="w-8 h-8 rounded-full bg-white text-black hover:bg-white/90 btn-smooth"
                    onClick={openAuthPopup}
                >
                    <UserIcon className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
