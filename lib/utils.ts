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

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}