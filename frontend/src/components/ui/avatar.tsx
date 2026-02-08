"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    data-slot="avatar"
    ref={ref}
    className={cn(
      "relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
