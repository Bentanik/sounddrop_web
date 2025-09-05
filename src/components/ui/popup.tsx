"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-full mx-4"
}

export default function Popup({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true
}: PopupProps) {
  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscape || !isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  // Prevent body scroll when popup is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close popup when clicking on the backdrop
    if (closeOnOverlayClick) {
      console.log("Overlay clicked, closing popup");
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          {/* Backdrop - this is the clickable area */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={handleOverlayClick}
          />

          {/* Popup Content */}
          <motion.div
            className={cn(
              "relative w-full bg-sidebar/95 backdrop-blur-xl rounded-3xl shadow-2xl cursor-default",
              sizeClasses[size],
              className
            )}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-8">
                {title && (
                  <h2 className="text-2xl font-bold text-foreground">
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-10 h-10 rounded-full btn-smooth hover:bg-white/10"
                    onClick={onClose}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </Button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="px-8 pb-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Popup Header Component
export function PopupHeader({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-between p-6 border-b border-sidebar-border", className)}>
      {children}
    </div>
  )
}

// Popup Content Component
export function PopupContent({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  )
}

// Popup Footer Component
export function PopupFooter({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center justify-end gap-3 p-6 border-t border-sidebar-border", className)}>
      {children}
    </div>
  )
}
