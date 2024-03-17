import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeBtn from "./ThemeBtn"
import Link from "next/link"

export default function GithubLink() {
  return (
    <div className="flex items-center">
      <Link href="https://github.com/PatrickChen928/faitch" target="_blank">
        <Button size="sm" variant="ghost">
          <Github className="h-4 w-4" />
        </Button>
      </Link>
      <ThemeBtn />
    </div>
  )
}