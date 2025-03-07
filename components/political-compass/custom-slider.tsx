"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface CustomSliderProps {
  value: number
  onChange: (value: number) => void
}

export function CustomSlider({ value, onChange }: CustomSliderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Calculate gradient colors based on value
  const getGradientStyle = () => {
    if (value === 50) {
      return { background: "#f1f5f9" } // Neutral color
    }

    if (value < 50) {
      // Disagree - left side gradient (purple)
      const intensity = 1 - value / 50
      return {
        background: `linear-gradient(to left, #f1f5f9, rgba(147, 51, 234, ${intensity * 0.9}))`,
      }
    } else {
      // Agree - right side gradient (purple)
      const intensity = (value - 50) / 50
      return {
        background: `linear-gradient(to right, #f1f5f9, rgba(147, 51, 234, ${intensity * 0.9}))`,
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateValue(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateValue(e.touches[0].clientX)
  }

  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const position = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (position / rect.width) * 100))
    onChange(Math.round(percentage))
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientX)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        updateValue(e.touches[0].clientX)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("touchmove", handleTouchMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="relative pt-5 pb-5">
      {/* Track */}
      <div
        ref={sliderRef}
        className="h-2 rounded-full cursor-pointer"
        style={getGradientStyle()}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-foreground/30"></div>
      </div>

      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary shadow-md cursor-grab active:cursor-grabbing"
        style={{ left: `${value}%`, transform: "translate(-50%, -50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></div>
    </div>
  )
}

