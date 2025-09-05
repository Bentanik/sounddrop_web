"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Music, ListMusic, User, Settings, Crown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Download as DownloadIcon, Heart as HeartIcon, Home as HomeIcon, Plus as PlusIcon, Search as SearchIcon, LibraryBig as LibraryBigIcon } from "lucide-react"


interface PlaylistItem {
    id: string
    name: string
    type: "playlist" | "album" | "artist"
    creator?: string
    image?: string
}

const libraryItems = [
    { icon: PlusIcon, label: "Tạo playlist" },
    { icon: HeartIcon, label: "Bài hát yêu thích" },
    { icon: DownloadIcon, label: "Nhạc đã tải" },
]

const defaultPlaylists: PlaylistItem[] = [
    { id: "1", name: "Bài hát yêu thích", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "2", name: "Khám phá hàng tuần", type: "playlist", creator: "Spotify", image: "/images/album.png" },
    { id: "3", name: "Radar phát hành", type: "playlist", creator: "Spotify", image: "/images/album.png" },
    { id: "4", name: "Mix hàng ngày 1", type: "playlist", creator: "Spotify", image: "/images/album.png" },
    { id: "5", name: "Nhạc thư giãn", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "6", name: "Nhạc tập gym", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "7", name: "Road Trip", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "8", name: "Party Vibes", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "9", name: "Study Focus", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "10", name: "Sleep Well", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "11", name: "Workout Energy", type: "playlist", creator: "Bạn", image: "/images/album.png" },
    { id: "12", name: "Chill Vibes", type: "playlist", creator: "Bạn", image: "/images/album.png" },
]

export default function Sidebar() {
    const [playlists] = useState<PlaylistItem[]>(defaultPlaylists)
    const pathname = usePathname()

    const navigationItems = [
        { icon: HomeIcon, label: "Trang chủ", href: "/" },
        { icon: SearchIcon, label: "Tìm kiếm", href: "/search" },
        { icon: LibraryBigIcon, label: "Thư viện", href: "/library" },
    ]

    return (
        <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
            {/* Logo - Fixed */}
            <div className="px-6 h-[80px] flex items-center border-b border-sidebar-border flex-shrink-0">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg spotify-gradient flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold spotify-text-gradient">SoundDrop</h1>
                </Link>
            </div>

            <div className="p-4 border-b border-sidebar-border flex-shrink-0">
                <nav className="space-y-1.5">
                    {navigationItems.map((item) => (
                        <Link key={item.label} href={item.href}>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 h-11 px-4 rounded-lg btn-smooth font-medium hover:text-white hover:bg-white/5 ${pathname === item.href
                                    ? "bg-white/5 text-white"
                                    : "text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Library Section - Fixed */}
            <div className="px-4 py-4 border-b border-sidebar-border flex-shrink-0">
                <div className="space-y-1.5">
                    {libraryItems.map((item) => (
                        <Link key={item.label} href="#">
                            <Button
                                variant="ghost"
                                className={`w-full justify-start gap-3 h-11 px-4 rounded-lg btn-smooth font-medium ${pathname === "#"
                                    ? "bg-white/5 text-white"
                                    : "text-white hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Playlists - Scrollable */}
            <div className="flex-1 px-4 py-4 min-h-0">
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Tạo gần đây</h3>
                </div>

                <ScrollArea className="h-full custom-scrollbar">
                    <div className="space-y-1.5 pb-12">
                        {playlists.map((playlist) => (
                            <Link key={playlist.id} href={`/${playlist.type}/${playlist.id}`}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 h-14 px-4 text-left hover:bg-white/5 btn-smooth rounded-lg"
                                >
                                    <div className="w-10 h-10 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-border/50 overflow-hidden">
                                        {playlist.image ? (
                                            <img src={playlist.image} alt={playlist.name} className="w-full h-full object-cover" />
                                        ) : playlist.type === "playlist" ? (
                                            <ListMusic className="w-5 h-5 text-muted-foreground" />
                                        ) : playlist.type === "album" ? (
                                            <Music className="w-5 h-5 text-muted-foreground" />
                                        ) : (
                                            <User className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-sidebar-foreground truncate">{playlist.name}</p>
                                        <p className="text-xs text-white/80">
                                            {playlist.type === "playlist" ? "Playlist" : playlist.type === "album" ? "Album" : "Nghệ sĩ"} •{" "}
                                            {playlist.creator}
                                        </p>
                                    </div>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Bottom Section - Fixed */}
            <div className="p-4 border-t border-sidebar-border flex-shrink-0">
                <Link href="/profile" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-primary/20">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-sidebar-foreground">Viet Vy</p>
                            <Crown className="w-4 h-4 text-yellow-400" />
                        </div>
                        <p className="text-xs text-muted">Premium Member</p>
                    </div>
                    <Button variant="ghost" size="icon" className="w-9 h-9 rounded-lg hover:bg-white/5 btn-smooth">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
