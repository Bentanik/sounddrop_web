"use client"

import { useState } from "react"
import { WidgetCard as Card, WidgetCardContent as CardContent } from "@/components/widgets"
import { Play, Pause, MoreHorizontal, Heart, Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { extractDominantColorFromImage, rgbaString } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"

interface Album {
    id: string
    title: string
    artist: string
    image: string
    year?: number
    type: "album" | "playlist" | "artist"
}

interface Section {
    title: string
    items: Album[]
}

// Quick Picks
const quickPickItems: Album[] = [
    { id: "q1", title: "Nhạc Chill", artist: "Spotify", image: "/images/album.png", type: "playlist" },
    { id: "q2", title: "Top Hits Hôm Nay", artist: "Spotify", image: "/images/album.png", type: "playlist" },
    { id: "q3", title: "RapCaviar", artist: "Spotify", image: "/images/album.png", type: "playlist" },
    { id: "q4", title: "Nhạc 2010s", artist: "Spotify", image: "/images/album.png", type: "playlist" },
    { id: "q5", title: "Rock Kinh Điển", artist: "Spotify", image: "/images/album.png", type: "playlist" },
    { id: "q6", title: "Jazz Vibes", artist: "Spotify", image: "/images/album.png", type: "playlist" },
]

// Featured Sections
const featuredSections: Section[] = [
    {
        title: "Dành cho bạn",
        items: [
            { id: "1", title: "Khám phá hàng tuần", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "2", title: "Daily Mix 1", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "3", title: "Radar phát hành", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "4", title: "Bài hát đã thích", artist: "320 bài hát", image: "/images/album.png", type: "playlist" },
            { id: "5", title: "Top bài hát 2024", artist: "Spotify", image: "/images/album.png", type: "playlist" },
        ],
    },
    {
        title: "Nghe gần đây",
        items: [
            { id: "6", title: "Midnight City", artist: "M83", image: "/images/album.png", type: "album" },
            { id: "7", title: "Random Access Memories", artist: "Daft Punk", image: "/images/album.png", type: "album" },
            { id: "8", title: "Currents", artist: "Tame Impala", image: "/images/album.png", type: "album" },
            { id: "9", title: "After Hours", artist: "The Weeknd", image: "/images/album.png", type: "album" },
            { id: "10", title: "Future Nostalgia", artist: "Dua Lipa", image: "/images/album.png", type: "album" },
        ],
    },
    {
        title: "Nghệ sĩ phổ biến",
        items: [
            { id: "11", title: "Sơn Tùng M-TP", artist: "23,456,789 người nghe hàng tháng", image: "/images/album.png", type: "artist" },
            { id: "12", title: "Billie Eilish", artist: "45,123,456 người nghe hàng tháng", image: "/images/album.png", type: "artist" },
            { id: "13", title: "Drake", artist: "67,890,123 người nghe hàng tháng", image: "/images/album.png", type: "artist" },
            { id: "14", title: "Taylor Swift", artist: "89,012,345 người nghe hàng tháng", image: "/images/album.png", type: "artist" },
            { id: "15", title: "Bad Bunny", artist: "56,789,012 người nghe hàng tháng", image: "/images/album.png", type: "artist" },
        ],
    },
    {
        title: "Playlist mới nhất",
        items: [
            { id: "16", title: "Nhạc Việt Hot", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "17", title: "Chill Vibes", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "18", title: "Workout Energy", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "19", title: "Study Focus", artist: "Spotify", image: "/images/album.png", type: "playlist" },
            { id: "20", title: "Party Mix", artist: "Spotify", image: "/images/album.png", type: "playlist" },
        ],
    },
]

const containerVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.05 },
    },
}

const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
}

export function MainContent() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)
    const [playingItem, setPlayingItem] = useState<string | null>(null)
    const [colorMap, setColorMap] = useState<Record<string, string>>({})

    const handlePlayPause = (itemId: string) => {
        if (playingItem === itemId) {
            setPlayingItem(null)
        } else {
            setPlayingItem(itemId)
        }
    }

    // Removed dominant color extraction to avoid main-thread work for smoother scrolling

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Chào buổi sáng"
        if (hour < 18) return "Chào buổi chiều"
        return "Chào buổi tối"
    }

    return (
        <div className="flex-1 bg-sidebar overflow-hidden">
            <ScrollArea className="h-[calc(100vh-6rem)] w-full custom-scrollbar">
                <div className="p-6 space-y-8 min-h-full">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground font-playfair mb-2">{getGreeting()}</h1>
                        <p className="text-muted-foreground">Khám phá nhạc mới và thưởng thức những bài hát yêu thích</p>
                    </div>

                    {/* Quick Picks Grid */}
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" variants={containerVariants} initial="hidden" animate="show">
                        {quickPickItems.map((item) => (
                            <motion.div key={item.id} variants={itemVariants} whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}>
                                <Card
                                    className="cursor-pointer group transition-colors bg-white/12 hover:bg-white/20 text-white"
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <CardContent className="p-0 flex items-center gap-3">
                                        <img
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-l-lg"
                                        />
                                        <div className="flex-1 min-w-0 py-4">
                                            <h3 className="font-medium text-white truncate text-sm">{item.title}</h3>
                                            <p className="text-xs text-white/80 truncate">{item.artist}</p>
                                        </div>
                                        <div className="pr-4">
                                            <Button
                                                size="icon"
                                                className={`w-10 h-10 rounded-full bg-white text-black hover:bg-white/90 hover:text-black transition-opacity duration-150 ${hoveredItem === item.id ? "opacity-100" : "opacity-0"}`}
                                                onClick={() => handlePlayPause(item.id)}
                                            >
                                                {playingItem === item.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Featured Sections */}
                    {featuredSections.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground font-playfair">{section.title}</h2>
                                <Link href={`/${section.title.toLowerCase().replace(" ", "-")}`} className="text-white/80 hover:text-white">
                                    Xem tất cả
                                </Link>
                            </div>

                            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                                {section.items.map((item) => (
                                    <motion.div key={item.id} variants={itemVariants} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                                        <Card
                                            className="cursor-pointer group p-4 transition-colors rounded-xl bg-transparent hover:bg-white/5"
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            <CardContent className="p-0 space-y-3">
                                                <div className="relative">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.title}
                                                        className={`w-full aspect-square object-cover rounded-lg`}
                                                    />
                                                    <Button
                                                        size="icon"
                                                        className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white text-black hover:bg-white/90 hover:text-black transition-opacity duration-150 ${hoveredItem === item.id ? "opacity-100" : "opacity-0"}`}
                                                        onClick={() => handlePlayPause(item.id)}
                                                    >
                                                        {playingItem === item.id ? (
                                                            <Pause className="w-5 h-5" />
                                                        ) : (
                                                            <Play className="w-5 h-5 ml-0.5" />
                                                        )}
                                                    </Button>
                                                </div>

                                                <div className="space-y-0.5">
                                                    <h3 className="font-medium text-foreground truncate text-balance text-sm">{item.title}</h3>
                                                    <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
                                                </div>

                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-white/5">
                                                        <Heart className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-white/5">
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8 text-muted-foreground hover:text-foreground hover:bg-white/5">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}

                    {/* Bottom Padding for Player */}
                    <div className="h-32" />
                </div>
            </ScrollArea>
        </div>
    )
}
