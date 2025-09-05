"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  PictureInPicture2,
  ListMusic,
  Mic2,
  MonitorSpeaker,
} from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  image: string
  duration: number
  url?: string
}

const currentTrack: Track = {
  id: "1",
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  image: "/images/album.png",
  duration: 200, // 3:20 in seconds
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(45)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [isLiked, setIsLiked] = useState(false)
  const [showQueue, setShowQueue] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    setIsMuted(value[0] === 0)
  }

  const getVolumeLevel = () => {
    const vol = isMuted ? 0 : volume[0]
    if (vol === 0) return 0
    if (vol <= 33) return 1
    if (vol <= 66) return 2
    return 3
  }

  const getVolumeIcon = () => {
    const level = getVolumeLevel()
    switch (level) {
      case 0:
        return <VolumeX className="w-4 h-4 text-muted-foreground" />
      case 1:
        return <Volume1 className="w-4 h-4 text-muted-foreground" />
      case 2:
        return <Volume2 className="w-4 h-4 text-muted-foreground" />
      case 3:
        return <Volume2 className="w-4 h-4 text-muted-foreground" />
      default:
        return <Volume2 className="w-4 h-4 text-muted-foreground" />
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"]
    const currentIndex = modes.indexOf(repeatMode)
    setRepeatMode(modes[(currentIndex + 1) % modes.length])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border backdrop-blur-md z-50">

        <div className="flex items-center justify-between px-4 py-3 gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0 flex-1 max-w-sm">
            <img
              src={currentTrack.image || "/placeholder.svg"}
              alt={currentTrack.title}
              className="w-14 h-14 rounded-lg object-cover shadow-lg"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-foreground truncate text-sm">{currentTrack.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 flex-shrink-0 btn-smooth"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-white text-white" : "text-muted-foreground"}`} />
            </Button>
            <Button size="icon" variant="ghost" className="w-8 h-8 flex-shrink-0 btn-smooth">
              <PictureInPicture2 className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
            {/* Control Buttons */}
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 btn-smooth"
                onClick={() => setIsShuffled(!isShuffled)}
              >
                <Shuffle className={`w-4 h-4 ${isShuffled ? "text-white" : "text-muted-foreground"}`} />
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth">
                <SkipBack className="w-4 h-4 text-foreground" />
              </Button>

              <Button size="icon" className="w-10 h-10 rounded-full bg-white text-black hover:bg-white/90" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth">
                <SkipForward className="w-4 h-4 text-foreground" />
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth" onClick={toggleRepeat}>
                <Repeat className={`w-4 h-4 ${repeatMode !== "off" ? "text-white" : "text-muted-foreground"}`} />
                {repeatMode === "one" && <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />}
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={currentTrack.duration}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              </div>
              <span className="text-xs text-muted-foreground w-10">{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume and Additional Controls */}
          <div className="flex items-center gap-2 min-w-0 flex-1 max-w-sm justify-end">
            <Button
              size="icon"
              variant="ghost"
              className={`w-8 h-8 btn-smooth ${showLyrics ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setShowLyrics(!showLyrics)}
            >
              <Mic2 className="w-4 h-4" />
            </Button>

            <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth" onClick={() => setShowQueue(!showQueue)}>
              <ListMusic className={`w-4 h-4 ${showQueue ? "text-primary" : "text-muted-foreground"}`} />
            </Button>

            <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth">
              <MonitorSpeaker className="w-4 h-4 text-muted-foreground" />
            </Button>

            <div className="flex items-center gap-2 min-w-0 w-48">
              <Button size="icon" variant="ghost" className="w-8 h-8 flex-shrink-0 btn-smooth" onClick={toggleMute}>
                {getVolumeIcon()}
              </Button>
              <div className="flex-1">
                <Slider
                  value={isMuted ? [0] : volume}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-1 min-w-0">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`w-1 h-3 rounded-full transition-colors duration-200 ${getVolumeLevel() >= level ? "bg-primary" : "bg-muted-foreground/30"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  {isMuted ? "0%" : `${volume[0]}%`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
