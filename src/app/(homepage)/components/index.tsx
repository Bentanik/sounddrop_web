'use client'

import { MainContent } from '@/app/(homepage)/components/main-content'
import { Header, Sidebar } from '@/components/layout'
import { MusicPlayer } from '@/components/widgets'

export default function HomeComponent() {
    return (
        <div className="h-screen bg-background text-foreground flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Top Bar */}
                    <header>
                        <Header />
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                        <MainContent />
                    </div>
                </div>
            </div>

            <MusicPlayer />
        </div>
    )
}