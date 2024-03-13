import { cookies } from 'next/headers'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRadomBgOfAvatar() {
  const colors = [
    "5DA2FC",
    "F472B6",
    "F59E0B",
    "48BB78",
    "9F7AEA",
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}