"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
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
      <div className="fixed bottom-0 left-0 right-0 bg-player border-t border-border backdrop-blur-md z-50">

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
              <Heart className={`w-4 h-4 ${isLiked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
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
                <Shuffle className={`w-4 h-4 ${isShuffled ? "text-primary" : "text-muted-foreground"}`} />
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth">
                <SkipBack className="w-4 h-4 text-foreground" />
              </Button>

              <Button size="icon" className="w-10 h-10 rounded-full spotify-gradient shadow-lg" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth">
                <SkipForward className="w-4 h-4 text-foreground" />
              </Button>

              <Button size="icon" variant="ghost" className="w-8 h-8 btn-smooth" onClick={toggleRepeat}>
                <Repeat className={`w-4 h-4 ${repeatMode !== "off" ? "text-primary" : "text-muted-foreground"}`} />
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

            <div className="flex items-center gap-2 min-w-0 w-32">
              <Button size="icon" variant="ghost" className="w-8 h-8 flex-shrink-0 btn-smooth" onClick={toggleMute}>
                {isMuted || volume[0] === 0 ? (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
